// Helper functions for device detection and QR code utilities

// Check if the device is mobile
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Function to convert base64 to blob
export const base64ToBlob = (b64Data: string, contentType: string = ''): Blob => {
  const byteCharacters = atob(b64Data.split(',')[1]);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

// Format wallet address for display
export const formatWalletAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Format amount with currency symbol
export const formatCurrency = (amount: number | string, currency: string = 'INR'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '0.00';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
  
  return formatter.format(numAmount);
};

// Parse QR code data (handling UPI QR codes and other formats)
export const parseQRData = (data: string): Record<string, any> | null => {
  try {
    if (!data) return null;
    
    console.log("Raw QR data:", data);
    
    // Check if it's a UPI payment URL
    if (data.toLowerCase().startsWith('upi://pay')) {
      const params = new URLSearchParams(data.split('?')[1]);
      const result: Record<string, string> = {};
      
      // Map UPI parameters to our standard format
      if (params.get('pa')) result.address = params.get('pa')!; // Payee address (VPA)
      if (params.get('pn')) result.name = params.get('pn')!; // Payee name
      if (params.get('am')) result.amount = params.get('am')!; // Amount
      if (params.get('cu')) result.currency = params.get('cu')!; // Currency
      if (params.get('tn')) result.note = params.get('tn')!; // Transaction note
      
      // Add QR type identification
      result.qrType = 'UPI';
      
      // Add razorpay VPA identification
      if (result.address && result.address.includes('@razorpay')) {
        result.isRazorpay = 'true';
        result.razorpayId = result.address.split('@')[0];
      }
      
      // For UPI, default to INR if not specified and add crypto conversion
      if (!result.currency) result.currency = 'INR';
      
      // If it's INR, add crypto equivalent for our app
      if (result.currency === 'INR' && result.amount) {
        const inrAmount = parseFloat(result.amount);
        // Mock conversion rates
        const ethRate = 250000; // 1 ETH = 250,000 INR
        const maticRate = 100; // 1 MATIC = 100 INR
        
        // Add ETH conversion for display
        const ethAmount = (inrAmount / ethRate).toFixed(6);
        result.cryptoAmount = ethAmount;
        result.cryptoCurrency = 'ETH';
        
        // Also include alternative MATIC amount
        result.alternativeCryptoAmount = (inrAmount / maticRate).toFixed(4);
        result.alternativeCryptoCurrency = 'MATIC';
      }
      
      return result;
    }
    
    // If it's a Razorpay-specific format
    if (data.includes('razorpay.com') || data.includes('rzp.io')) {
      console.log("Detected Razorpay QR code");
      
      let url;
      try {
        url = new URL(data);
      } catch (e) {
        // Not a valid URL, maybe just the domain part?
        if (data.includes('http')) {
          url = new URL(data);
        } else {
          url = new URL('https://' + data);
        }
      }
      
      const result: Record<string, string> = {};
      
      // Add QR type identification
      result.qrType = 'RAZORPAY';
      result.isRazorpay = 'true';
      
      // Extract parameters from URL
      const amountParam = url.searchParams.get('amount');
      if (amountParam) {
        // Convert paise to rupees if needed
        const isInPaise = parseInt(amountParam) > 1000; // Heuristic: if > 1000, assume paise
        result.amount = isInPaise ? (parseInt(amountParam) / 100).toString() : amountParam;
        result.currency = 'INR';
      }
      
      if (url.searchParams.get('merchant_id')) {
        result.merchantId = url.searchParams.get('merchant_id')!;
      }
      
      if (url.searchParams.get('mid')) {
        result.merchantId = url.searchParams.get('mid')!;
      }
      
      if (url.searchParams.get('description') || url.searchParams.get('desc')) {
        result.note = url.searchParams.get('description') || url.searchParams.get('desc')!;
      }
      
      // If merchant uses Razorpay but no VPA extracted yet, create a placeholder
      if (!result.address && result.merchantId) {
        result.address = `${result.merchantId}@razorpay`;
      }
      
      // Convert INR to crypto
      if (result.amount) {
        const inrAmount = parseFloat(result.amount);
        
        // Only use EDU conversion rate
        const eduRate = 12.47; // 1 EDU = 12.47 INR
        
        // Add EDU conversion
        const eduAmount = (inrAmount / eduRate).toFixed(6);
        result.cryptoAmount = eduAmount;
        result.cryptoCurrency = 'EDU'; // Always set to EDU
        
        // Remove any alternative cryptocurrencies
        delete result.alternativeCryptoAmount;
        delete result.alternativeCryptoCurrency;
      }
      
      return result;
    }
    
    // Try to parse as JSON
    try {
      const parsedData = JSON.parse(data);
      
      // If it contains a crypto address, use it
      if (parsedData.address && parsedData.address.startsWith('0x')) {
        // If the parsed data has INR currency, add crypto conversion
        if (parsedData.currency === 'INR' && parsedData.amount) {
          const inrAmount = parseFloat(parsedData.amount);
          // Add ETH conversion
          const ethAmount = (inrAmount / 250000).toFixed(6);
          parsedData.cryptoAmount = ethAmount;
          parsedData.cryptoCurrency = 'ETH';
        }
        return parsedData;
      }
      
      // If it's in a standard format we recognize
      if (parsedData.amount || parsedData.address || parsedData.currency) {
        return parsedData;
      }
      
      return parsedData;
    } catch (error) {
      // Not JSON, check if it's an Ethereum address
      if (data.startsWith('0x') && data.length === 42) {
        return { address: data };
      }
      
      // If all else fails, return the raw data
      return { raw: data };
    }
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
};

// Get local camera permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Stop all tracks to release the camera
    stream.getTracks().forEach(track => track.stop());
    
    return true;
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

// Take screenshot (for desktop QR scanning)
export const captureScreenshot = async (): Promise<string | null> => {
  try {
    // Check if getDisplayMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      console.error('getDisplayMedia is not supported in this browser');
      return null;
    }

    // Request screen capture with TypeScript-compatible options
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    // Create a video element to capture the stream
    const video = document.createElement('video');
    video.srcObject = stream;

    // Wait for video metadata to load
    await new Promise<void>((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
      
      // Add timeout in case metadata never loads
      setTimeout(() => resolve(), 1000);
    });

    // Use fallback dimensions if needed
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    // Create a canvas to draw the video frame
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Draw the video frame to the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());

    // Convert canvas to data URL
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return null;
  }
}; 