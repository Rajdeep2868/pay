// Helper functions for device detection and QR code utilities

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const formatWalletAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

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

export const parseQRData = (data: string): Record<string, any> | null => {
  try {
    if (!data) return null;
    
    console.log("Raw QR data:", data);
    
    // Check if it's a UPI payment URL
    if (data.toLowerCase().startsWith('upi://pay')) {
      const params = new URLSearchParams(data.split('?')[1]);
      const result: Record<string, string> = {};
      
      if (params.get('pa')) result.address = params.get('pa')!;
      if (params.get('pn')) result.name = params.get('pn')!;
      if (params.get('am')) result.amount = params.get('am')!;
      if (params.get('cu')) result.currency = params.get('cu')!;
      if (params.get('tn')) result.note = params.get('tn')!;
      
      result.qrType = 'UPI';
      
      if (result.address && result.address.includes('@razorpay')) {
        result.isRazorpay = 'true';
        result.razorpayId = result.address.split('@')[0];
      }
      
      if (!result.currency) result.currency = 'INR';
      
      if (result.currency === 'INR' && result.amount) {
        const inrAmount = parseFloat(result.amount);
        const eduRate = 12.47;
        
        const eduAmount = (inrAmount / eduRate).toFixed(6);
        result.cryptoAmount = eduAmount;
        result.cryptoCurrency = 'EDU';
      }
      
      return result;
    }
    
    // Try to parse as JSON
    try {
      const parsedData = JSON.parse(data);
      
      if (parsedData.address && parsedData.address.startsWith('0x')) {
        if (parsedData.currency === 'INR' && parsedData.amount) {
          const inrAmount = parseFloat(parsedData.amount);
          const eduAmount = (inrAmount / 12.47).toFixed(6);
          parsedData.cryptoAmount = eduAmount;
          parsedData.cryptoCurrency = 'EDU';
        }
        return parsedData;
      }
      
      return parsedData;
    } catch (error) {
      if (data.startsWith('0x') && data.length === 42) {
        return { address: data };
      }
      
      return { raw: data };
    }
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
};

export const captureScreenshot = async (): Promise<string | null> => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      console.error('getDisplayMedia is not supported in this browser');
      return null;
    }

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    const video = document.createElement('video');
    video.srcObject = stream;

    await new Promise<void>((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
      setTimeout(() => resolve(), 1000);
    });

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    stream.getTracks().forEach(track => track.stop());

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return null;
  }
};