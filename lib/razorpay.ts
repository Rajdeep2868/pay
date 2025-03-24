declare global {
  interface Window {
    Razorpay: any;
  }
}

// Test key - Updated with user-provided key
const RAZORPAY_KEY_ID = 'rzp_test_a4zcZABGsJEBrs';

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    // If Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

// Interface for Razorpay order creation response
export interface RazorpayOrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

// Interface for Razorpay payment initialization options
export interface RazorpayOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  notes?: Record<string, string>;
}

// Interface for Razorpay payment result
export interface RazorpayPaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

// Create a Razorpay order
export const createRazorpayOrder = async (amount: number): Promise<RazorpayOrderResponse> => {
  try {
    // In a real implementation, this would call your backend API to create an order
    // For demo purposes, we'll mock this step
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful order creation
    const mockOrderId = `order_${Date.now()}`;
    
    return {
      success: true,
      orderId: mockOrderId
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return {
      success: false,
      error: error.message || "Failed to create Razorpay order"
    };
  }
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (options: RazorpayOptions): Promise<RazorpayPaymentResult> => {
  return new Promise((resolve) => {
    // Check if Razorpay is available
    if (!window.Razorpay) {
      // Load Razorpay script if not available
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      
      script.onload = () => {
        // Initialize once script is loaded
        initializeRazorpayOnce(options, resolve);
      };
      
      script.onerror = () => {
        resolve({
          success: false,
          error: "Failed to load Razorpay checkout script"
        });
      };
    } else {
      // Initialize directly if already available
      initializeRazorpayOnce(options, resolve);
    }
  });
};

// Helper function to initialize Razorpay once script is loaded
const initializeRazorpayOnce = (
  options: RazorpayOptions,
  callback: (result: RazorpayPaymentResult) => void
) => {
  try {
    // For test mode, use test key
    const razorpayOptions = {
      key: RAZORPAY_KEY_ID, // Use the updated key from the constant
      amount: options.amount * 100, // Amount in smallest currency unit (paise for INR)
      currency: options.currency,
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      notes: options.notes || {},
      handler: function (response: any) {
        callback({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      },
      modal: {
        ondismiss: function () {
          callback({
            success: false,
            error: "Payment cancelled by user"
          });
        }
      },
      prefill: {
        name: 'Demo User',
        email: 'demo@example.com',
        contact: '+919876543210'
      },
      theme: {
        color: '#6d28d9'
      }
    };
    
    // Create Razorpay instance
    const razorpay = new window.Razorpay(razorpayOptions);
    
    // Open Razorpay checkout
    razorpay.open();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
    callback({
      success: false,
      error: error.message || "Failed to initialize Razorpay payment"
    });
  }
};

// Parse UPI QR code data
export const parseRazorpayQRData = (qrData: string): { 
  merchantId?: string;
  amount?: string;
  transactionNote?: string;
  vpa?: string; // UPI Virtual Payment Address
} => {
  try {
    // If it's a UPI URL
    if (qrData.toLowerCase().startsWith('upi://pay')) {
      const params = new URLSearchParams(qrData.split('?')[1]);
      return {
        merchantId: params.get('pn') || undefined,
        amount: params.get('am') || undefined,
        transactionNote: params.get('tn') || undefined,
        vpa: params.get('pa') || undefined
      };
    }
    
    // If it's a Razorpay-specific format
    if (qrData.includes('razorpay.com') || qrData.includes('rzp.io')) {
      // Extract parameters from URL
      const url = new URL(qrData);
      const amountParam = url.searchParams.get('amount');
      
      return {
        merchantId: url.searchParams.get('merchant_id') || url.searchParams.get('mid') || undefined,
        amount: amountParam ? (parseFloat(amountParam) / 100).toString() : undefined, // Convert paise to rupees
        transactionNote: url.searchParams.get('description') || url.searchParams.get('desc') || undefined
      };
    }
    
    // Try to parse as JSON
    try {
      const jsonData = JSON.parse(qrData);
      return {
        merchantId: jsonData.merchant_name || jsonData.merchantId || jsonData.merchant_id,
        amount: jsonData.amount,
        transactionNote: jsonData.description || jsonData.note,
        vpa: jsonData.vpa || jsonData.upi_id
      };
    } catch (e) {
      // Not JSON, continue
    }
    
    // If we couldn't parse in any known format
    return {};
  } catch (error) {
    console.error("Error parsing QR data:", error);
    return {};
  }
}; 