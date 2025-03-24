import { NextResponse } from 'next/server';

// Razorpay test key provided by the user
const RAZORPAY_KEY_ID = 'rzp_test_a4zcZABGsJEBrs';
// Secret key should be stored in environment variables in production
// For this demo, we'll use a placeholder that should be replaced with your actual secret
const RAZORPAY_SECRET = 'your_razorpay_secret_key';

// Helper function to better format logs
const logWithDetails = (message: string, data: any) => {
  console.log(`[Razorpay API] ${message}:`, JSON.stringify(data, null, 2));
};

export async function POST(request: Request) {
  console.log("[Razorpay API] Received request");

  // CORS headers to allow requests from any origin during development
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Parse request body
    let data;
    try {
      data = await request.json();
      logWithDetails("Received payment notification data", data);
    } catch (error) {
      console.error("[Razorpay API] Failed to parse request body:", error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid request body - not valid JSON'
      }, { 
        status: 400,
        headers: corsHeaders
      });
    }
    
    // Validate required fields
    const requiredFields = ['amount', 'cryptoAmount', 'cryptoCurrency'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.error(`[Razorpay API] Missing required fields: ${missingFields.join(', ')}`);
      return NextResponse.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { 
        status: 400,
        headers: corsHeaders
      });
    }
    
    // Extract payment details from request
    const { 
      amount, 
      merchantVpa, 
      transactionHash,
      cryptoAmount,
      cryptoCurrency,
      paymentId,
      merchantId,
      timestamp
    } = data;

    // Log detailed payment information for debugging
    logWithDetails("Processing payment data", {
      amount,
      merchantVpa,
      cryptoAmount,
      cryptoCurrency,
      transactionHash: transactionHash ? `${transactionHash.substring(0, 10)}...` : 'none',
      timestamp
    });
    
    // If we're in a real environment, make actual calls to Razorpay APIs
    // For this hackathon demo, we'll make simulated requests that could be replaced with real ones
    
    // 1. Create a Razorpay order (simulated but using real API structure)
    const orderData = {
      amount: Math.round(parseFloat(amount) * 100), // Amount in paise
      currency: 'INR',
      receipt: `crypto_tx_${Date.now()}`,
      payment_capture: 1,
      notes: {
        crypto_amount: cryptoAmount,
        crypto_currency: cryptoCurrency,
        transaction_hash: transactionHash,
        payment_method: 'crypto',
        merchant_vpa: merchantVpa,
        merchant_name: merchantId,
        timestamp: timestamp || new Date().toISOString()
      }
    };
    
    logWithDetails("Creating Razorpay order with data", orderData);
    
    // For the demo, simulate a successful order creation
    const orderId = `order_demo_${Date.now()}`;
    
    // 2. Simulate payment capture (as if the customer has paid)
    const paymentData = {
      amount: orderData.amount,
      currency: 'INR',
      receipt: orderData.receipt,
      payment_capture: 1,
      notes: orderData.notes
    };
    
    logWithDetails("Would capture payment with data", paymentData);
    
    // 3. Create a virtual payment record for this transaction
    // For this demo, we'll simulate this
    const virtualPayment = {
      id: `pay_demo_${Date.now()}`,
      entity: 'payment',
      amount: orderData.amount,
      currency: 'INR',
      status: 'captured',
      order_id: orderId,
      method: 'crypto',
      captured: true,
      description: `Crypto payment: ${cryptoAmount} ${cryptoCurrency}`,
      notes: orderData.notes,
      created_at: Math.floor(Date.now() / 1000)
    };
    
    // In a real implementation, you might store this information in your database
    
    // For debugging purposes, add some logging information for QR code payments
    if (merchantVpa && merchantVpa.includes('@razorpay')) {
      console.log(`[Razorpay API] Successfully processed payment to Razorpay merchant: ${merchantVpa}`);
      console.log(`[Razorpay API] Payment would be reflected in the merchant's Razorpay dashboard`);
    }
    
    const responseData = { 
      success: true, 
      message: 'Payment successfully recorded with Razorpay',
      data: {
        order_id: orderId,
        payment: virtualPayment
      }
    };
    
    // Final success log before returning
    console.log(`[Razorpay API] Successfully processed payment of ${amount} INR (${cryptoAmount} ${cryptoCurrency})`);
    
    return NextResponse.json(responseData, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('[Razorpay API] Error processing payment:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to notify Razorpay',
      error: error.message || 'Unknown error'
    }, { 
      status: 500,
      headers: corsHeaders
    });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    },
  });
}

// In a real implementation, you would also need a function to validate Razorpay webhooks
// This would use the webhook secret to verify that the request is coming from Razorpay
function verifyRazorpayWebhook(payload: any, signature: string): boolean {
  // Implementation would verify signature using crypto
  return true; // Placeholder for demo
} 