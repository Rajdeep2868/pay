// Mock contract implementation for demo purposes
export enum CryptoType {
  EDU = 0,
  ETH = 1,
  MATIC = 2
}

export interface PaymentResponse {
  success: boolean;
  transactionHash?: string;
  paymentId?: string;
  error?: string;
}

export interface RazorpayNotificationData {
  amount: string;
  cryptoAmount: string;
  cryptoCurrency: string;
  transactionHash?: string;
  paymentId?: string;
  recipient: string;
  merchantVpa?: string;
  merchantId?: string;
}

// Mock conversion rates
const CONVERSION_RATES = {
  EDU: 12.47,  // 1 EDU = 12.47 INR
  ETH: 250000, // 1 ETH = 250,000 INR
  MATIC: 100   // 1 MATIC = 100 INR
};

export const getINRAmount = async (amount: string, cryptoType: CryptoType = CryptoType.EDU): Promise<string> => {
  try {
    const cryptoAmount = parseFloat(amount);
    let rate = CONVERSION_RATES.EDU;
    
    if (cryptoType === CryptoType.ETH) {
      rate = CONVERSION_RATES.ETH;
    } else if (cryptoType === CryptoType.MATIC) {
      rate = CONVERSION_RATES.MATIC;
    }
    
    const inrAmount = cryptoAmount * rate;
    return inrAmount.toFixed(2);
  } catch (error) {
    console.error("Error calculating INR amount:", error);
    return "0.00";
  }
};

export const notifyRazorpayAboutCryptoPayment = async (data: RazorpayNotificationData): Promise<boolean> => {
  try {
    console.log("Mock Razorpay notification:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("✅ Mock Razorpay payment recorded successfully");
    return true;
  } catch (error) {
    console.error("Mock Razorpay notification failed:", error);
    return false;
  }
};

export const payWithEDU = async (
  amount: string,
  razorpayData?: {
    merchantVpa?: string;
    merchantId?: string;
    recipient: string;
    inrAmount: string;
  }
): Promise<PaymentResponse> => {
  try {
    console.log(`Processing mock EDU payment: ${amount} EDU`);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock transaction hash
    const mockTxHash = "0x" + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    const mockPaymentId = "0x" + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    const result: PaymentResponse = {
      success: true,
      transactionHash: mockTxHash,
      paymentId: mockPaymentId
    };
    
    // Notify Razorpay if merchant data is provided
    if (razorpayData) {
      try {
        await notifyRazorpayAboutCryptoPayment({
          amount: razorpayData.inrAmount,
          cryptoAmount: amount,
          cryptoCurrency: "EDU",
          transactionHash: mockTxHash,
          paymentId: mockPaymentId,
          recipient: razorpayData.recipient,
          merchantVpa: razorpayData.merchantVpa,
          merchantId: razorpayData.merchantId
        });
      } catch (notifyError) {
        console.error("Error notifying Razorpay:", notifyError);
        result.error = "Payment successful but merchant notification had an error.";
      }
    }
    
    return result;
  } catch (error) {
    console.error("Error processing EDU payment:", error);
    return {
      success: false,
      error: error.message || "Failed to process EDU payment"
    };
  }
};

export const payWithETH = async (): Promise<PaymentResponse> => {
  return {
    success: false,
    error: "Unsupported currency: ETH. This demo only supports EDU payments."
  };
};

export const payWithMATIC = async (): Promise<PaymentResponse> => {
  return {
    success: false,
    error: "Unsupported currency: MATIC. This demo only supports EDU payments."
  };
};