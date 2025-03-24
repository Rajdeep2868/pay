import { ethers } from "ethers";

// Contract ABI for CryptoToINRConverter
const CRYPTO_TO_INR_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_eduPriceFeed",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_usdInrPriceFeed",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "paymentId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cryptoAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "inrAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum CryptoToINRConverter.CryptoType",
				"name": "cryptoType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "payWithEDU",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "paymentId",
				"type": "bytes32"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum CryptoToINRConverter.CryptoType",
				"name": "cryptoType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newPriceFeed",
				"type": "address"
			}
		],
		"name": "PriceFeedUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newPriceFeed",
				"type": "address"
			}
		],
		"name": "updatePriceFeed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newPriceFeed",
				"type": "address"
			}
		],
		"name": "updateUsdInrPriceFeed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newPriceFeed",
				"type": "address"
			}
		],
		"name": "UsdInrPriceFeedUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "checkPriceFeeds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cryptoAmount",
				"type": "uint256"
			}
		],
		"name": "convertToINR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract AggregatorV3Interface",
				"name": "priceFeed",
				"type": "address"
			}
		],
		"name": "getDecimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cryptoAmount",
				"type": "uint256"
			}
		],
		"name": "getINRAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestPrices",
		"outputs": [
			{
				"internalType": "int256",
				"name": "eduUsd",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "eduInr",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "usdInr",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "paymentId",
				"type": "bytes32"
			}
		],
		"name": "getPayment",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "cryptoAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "inrAmount",
						"type": "uint256"
					},
					{
						"internalType": "enum CryptoToINRConverter.CryptoType",
						"name": "cryptoType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoToINRConverter.Payment",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getPaymentBatch",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPaymentCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract AggregatorV3Interface",
				"name": "priceFeed",
				"type": "address"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract AggregatorV3Interface",
				"name": "priceFeed",
				"type": "address"
			}
		],
		"name": "isPriceFeedFresh",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "paymentIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "payments",
		"outputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "cryptoAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "inrAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum CryptoToINRConverter.CryptoType",
				"name": "cryptoType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Crypto types for contract calls - Updated for EDU
export enum CryptoType {
	EDU = 0,
	ETH = 1,
	MATIC = 2
}

// Contract address - Updated to EDU contract
export const CONTRACT_ADDRESS = "0x0b0d71c9f2d87634E49B75B0DAdB6954c397af63";

// Payment response type
export interface PaymentResponse {
	success: boolean;
	transactionHash?: string;
	paymentId?: string;
	error?: string;
}

// Payment data for Razorpay notification
export interface RazorpayNotificationData {
	amount: string;  // Amount in INR
	cryptoAmount: string;  // Original crypto amount
	cryptoCurrency: string;  // ETH or MATIC
	transactionHash?: string;  // Blockchain transaction hash
	paymentId?: string;  // Payment ID from smart contract
	recipient: string;  // Recipient address
	merchantVpa?: string;  // Merchant UPI ID from QR code
	merchantId?: string;  // Merchant ID from QR code
}

// Check if MetaMask or other provider is available
const isEthereumAvailable = (): boolean => {
	return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

// Create a mock provider for testing when no real provider is available
const createMockProvider = () => {
	console.warn("Using mock provider for testing. No real transactions will be processed.");
	
	// For ethers v5, we can create a simple mock provider
	const mockProvider = new ethers.providers.JsonRpcProvider();
	
	// Mock signer
	const mockSigner = mockProvider.getSigner();
	
	// Override methods we need
	mockProvider.getBalance = async () => ethers.utils.parseEther("10.0");
	
	return { provider: mockProvider, signer: mockSigner };
};

// Update getContract function to handle RPC errors
const getContract = async () => {
	try {
		if (!window.ethereum) {
			throw new Error("No Ethereum provider found. Please install MetaMask.");
		}
		
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		
		// Request accounts access
		await provider.send("eth_requestAccounts", []);
		
		// Get the signer
		const signer = provider.getSigner();
		
		// Create contract instance
		const contract = new ethers.Contract(CONTRACT_ADDRESS, CRYPTO_TO_INR_ABI, signer);
		
		return contract;
	} catch (error) {
		console.error("Error getting contract:", error);
		
		// Check if this is a common MetaMask error
		const errorMsg = error.message || "";
		if (errorMsg.includes("user rejected") || errorMsg.includes("User denied")) {
			throw new Error("Transaction rejected. Please approve the transaction in MetaMask.");
		}
		
		if (errorMsg.includes("Internal JSON-RPC error")) {
			throw new Error("MetaMask RPC error. This may be due to network congestion or configuration issues. Please try again.");
		}
		
		throw error;
	}
};

// Convert ETH or MATIC amount to wei
const convertToWei = (amount: string): string => {
	// EDU has 18 decimals like ETH
	return ethers.utils.parseEther(amount).toString();
};

// Notify Razorpay API about a successful crypto payment
// This function will send a notification to Razorpay API to update payment status
export const notifyRazorpayAboutCryptoPayment = async (data: RazorpayNotificationData): Promise<boolean> => {
	try {
		console.log("Notifying Razorpay about crypto payment:", data);
		
		// Make sure we have the required data
		if (!data.amount || !data.cryptoAmount || !data.cryptoCurrency) {
			console.error("Missing required payment data for Razorpay notification");
			return false;
		}
		
		// Add timestamp to help with debugging
		const notificationData = {
			...data,
			timestamp: new Date().toISOString(),
			// Include original INR amount in a clearer format
			inrAmount: data.amount
		};
		
		// Log the full payload for debugging
		console.log("Sending to Razorpay API endpoint:", notificationData);
		
		// Call our Next.js API route that handles Razorpay integration
		// Use absolute URL to avoid relative path issues
		const apiUrl = window.location.origin + '/api/razorpay-notify';
		console.log("API endpoint URL:", apiUrl);
		
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(notificationData)
		});
		
		if (!response.ok) {
			const errorText = await response.text();
			let errorData;
			try {
				errorData = JSON.parse(errorText);
			} catch (e) {
				// If not valid JSON, use the raw text
				errorData = { message: errorText };
			}
			console.error("Razorpay API error response:", {
				status: response.status,
				statusText: response.statusText,
				data: errorData
			});
			throw new Error(errorData.message || `Failed to notify Razorpay API (${response.status})`);
		}
		
		const result = await response.json();
		
		console.log("Razorpay notification result:", result);
		
		// Display the result in a more user-friendly way
		if (result.success) {
			console.log("%c✅ Razorpay payment recorded successfully", "color: green; font-weight: bold");
			// Log the important information from the response
			if (result.data && result.data.payment) {
				console.log("Payment ID:", result.data.payment.id);
				console.log("Amount:", result.data.payment.amount / 100, "INR");
				console.log("Status:", result.data.payment.status);
			}
		}
		
		return result.success;
	} catch (error) {
		console.error("Failed to notify Razorpay:", error);
		
		// Create a more visible error in the console for debugging
		console.log("%c❌ Razorpay notification failed", "color: red; font-weight: bold");
		console.log("Error details:", error.message);
		
		// Show an alert to the user so they know about the issue
		if (typeof window !== 'undefined') {
			window.alert(`Note: There was an issue updating Razorpay about your payment. The crypto payment was successful, but the merchant system might not show it immediately. Error: ${error.message}`);
		}
		
		return false;
	}
};

// Get INR amount for given crypto amount
export const getINRAmount = async (amount: string, cryptoType: CryptoType = CryptoType.EDU): Promise<string> => {
	try {
		// Use mock for UI testing if no real provider
		if (!isEthereumAvailable()) {
			// Mock conversion rates
			let mockRate = 12.47; // 1 EDU = 12.47 INR default
			
			if (cryptoType === CryptoType.ETH) {
				mockRate = 250000; // 1 ETH = 250,000 INR (example)
			} else if (cryptoType === CryptoType.MATIC) {
				mockRate = 100; // 1 MATIC = 100 INR (example)
			}
			
			const inrAmount = parseFloat(amount) * mockRate;
			return inrAmount.toFixed(2);
		}
		
		// Get contract
		const contract = await getContract();
		
		// Convert amount to wei
		const weiAmount = convertToWei(amount);
		
		// Call contract method - now we should pass cryptoType too, but the contract might not support it yet
		// For now, just use the existing method
		const inrAmount = await contract.getINRAmount(weiAmount);
		
		// Convert to readable format (INR has 2 decimal places)
		const readableAmount = ethers.utils.formatUnits(inrAmount, 2);
		
		return readableAmount;
	} catch (error) {
		console.error("Error getting INR amount:", error);
		
		// Fallback to mock conversion if contract call fails
		const mockRate = 12.47; // 1 EDU = 12.47 INR
		
		const inrAmount = parseFloat(amount) * mockRate;
		return inrAmount.toFixed(2);
	}
};

// Handle MetaMask transaction errors more gracefully
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
		// Use mock for UI testing if no real provider
		if (!isEthereumAvailable()) {
			const mockResult = simulateSuccessfulPayment(amount);
			
			// Notify Razorpay if merchant data is provided
			if (razorpayData) {
				await notifyRazorpayAboutCryptoPayment({
					amount: razorpayData.inrAmount,
					cryptoAmount: amount,
					cryptoCurrency: "EDU",
					transactionHash: mockResult.transactionHash,
					paymentId: mockResult.paymentId,
					recipient: razorpayData.recipient,
					merchantVpa: razorpayData.merchantVpa,
					merchantId: razorpayData.merchantId
				});
			}
			
			return mockResult;
		}
		
		// Get contract
		const contract = await getContract();
		
		// Convert amount to wei with error handling
		let weiAmount;
		try {
			weiAmount = ethers.utils.parseEther(amount);
		} catch (error) {
			console.error("Error parsing amount to wei:", error);
			throw new Error(`Invalid amount format: ${amount}. Please enter a valid number.`);
		}
		
		// Execute transaction with retry logic
		let tx;
		try {
			// Estimate gas before sending to catch errors early
			const gasEstimate = await contract.estimateGas.payWithEDU({
				value: weiAmount
			});
			
			// Add 20% buffer to gas estimate
			const gasLimit = gasEstimate.mul(120).div(100);
			
			tx = await contract.payWithEDU({
				value: weiAmount,
				gasLimit
			});
		} catch (error) {
			console.error("Transaction error:", error);
			
			// Handle specific error messages
			if (error.message && error.message.includes("insufficient funds")) {
				throw new Error("Insufficient funds in your wallet for this transaction");
			}
			
			if (error.message && error.message.includes("gas required exceeds")) {
				throw new Error("Transaction requires too much gas. Please try a smaller amount.");
			}
			
			// MetaMask specific error
			if (error.message && error.message.includes("Internal JSON-RPC error")) {
				throw new Error("MetaMask RPC error. This may be due to network congestion. Please try again in a moment.");
			}
			
			throw error;
		}
		
		// Wait for transaction to be mined with timeout
		let receipt;
		try {
			const receiptPromise = tx.wait();
			const timeoutPromise = new Promise((_, reject) => 
				setTimeout(() => reject(new Error("Transaction confirmation timeout. The transaction may still complete. Check your wallet for status.")), 60000)
			);
			
			receipt = await Promise.race([receiptPromise, timeoutPromise]);
		} catch (error) {
			console.error("Error waiting for transaction receipt:", error);
			
			// If timeout or other waiting error, return "pending" status
			return {
				success: true,
				transactionHash: tx.hash,
				paymentId: "",
				error: "Transaction submitted but confirmation timed out. It may still complete."
			};
		}
		
		// Extract payment ID from event logs if available
		let paymentId = "";
		if (receipt.events && receipt.events.length > 0) {
			// Look for PaymentReceived event
			const paymentEvent = receipt.events.find(e => e.event === "PaymentReceived");
			if (paymentEvent && paymentEvent.args) {
				paymentId = paymentEvent.args.paymentId;
			}
		}
		
		const result: PaymentResponse = {
			success: true,
			transactionHash: receipt.transactionHash,
			paymentId
		};
		
		// Notify Razorpay if merchant data is provided
		if (razorpayData) {
			try {
				await notifyRazorpayAboutCryptoPayment({
					amount: razorpayData.inrAmount,
					cryptoAmount: amount,
					cryptoCurrency: "EDU",
					transactionHash: receipt.transactionHash,
					paymentId: paymentId,
					recipient: razorpayData.recipient,
					merchantVpa: razorpayData.merchantVpa,
					merchantId: razorpayData.merchantId
				});
			} catch (notifyError) {
				// Don't fail the transaction if notification fails
				console.error("Error notifying Razorpay:", notifyError);
				result.error = "Payment successful but merchant notification had an error.";
			}
		}
		
		return result;
	} catch (error) {
		console.error("Error paying with EDU:", error);
		return {
			success: false,
			error: error.message || "Failed to process EDU payment"
		};
	}
};

// Updated the helper function to not need cryptoType parameter
function simulateSuccessfulPayment(amount: string): PaymentResponse {
	console.log(`Simulating successful payment of ${amount} EDU`);
	
	// Generate mock transaction hash
	const mockTxHash = "0x" + Array(64).fill(0).map(() => 
		Math.floor(Math.random() * 16).toString(16)).join('');
	
	// Generate mock payment ID
	const mockPaymentId = "0x" + Array(64).fill(0).map(() => 
		Math.floor(Math.random() * 16).toString(16)).join('');
	
	return {
		success: true,
		transactionHash: mockTxHash,
		paymentId: mockPaymentId
	};
}

// Keep the existing functions for backward compatibility if needed, 
// but they should throw errors indicating they're not supported anymore

export const payWithETH = async (): Promise<PaymentResponse> => {
	return {
		success: false,
		error: "Unsupported currency: ETH. This contract only supports EDU payments."
	};
};

export const payWithMATIC = async (): Promise<PaymentResponse> => {
	return {
		success: false,
		error: "Unsupported currency: MATIC. This contract only supports EDU payments."
	};
};
