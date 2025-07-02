# FusionPay Clone

A complete clone of the FusionPay crypto payment platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Multi-Wallet Support**: Connect MetaMask, WalletConnect, and other popular wallets
- **Virtual Crypto Cards**: Generate virtual payment cards backed by crypto
- **QR Code Payments**: Scan and pay with QR codes
- **Real-time Conversion**: Crypto to fiat conversion with live rates
- **Transaction History**: Complete transaction management and history
- **Responsive Design**: Mobile-first design with smooth animations
- **Demo Mode**: Works without real Firebase/blockchain connections for testing

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: Demo authentication system (Firebase-compatible)
- **State Management**: React Context API
- **Blockchain**: Mock contract integration (EduChain compatible)
- **UI Components**: Custom components with Lucide React icons

## Getting Started

1. **Clone and Install**:
```bash
git clone <repository-url>
cd fusionpay-clone
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Open in Browser**:
Navigate to `http://localhost:3000`

## Demo Features

- **Authentication**: Use any email/password to sign in
- **Wallet Connection**: Connect demo wallets or real MetaMask
- **Payments**: Simulate crypto payments with mock transactions
- **QR Scanning**: Test QR code scanning functionality
- **Transaction History**: View mock transaction data

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication pages
│   ├── signup/           
│   └── pay/              # Payment interface
├── components/           # Reusable components
│   ├── hero.tsx         # Landing page hero
│   ├── navbar.tsx       # Navigation
│   ├── WalletConnect.tsx # Wallet connection
│   └── ...
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication state
│   └── WalletContext.tsx # Wallet management
├── lib/                 # Utility libraries
│   ├── contracts.ts     # Mock blockchain contracts
│   ├── utils.ts         # Helper functions
│   └── firebase.ts      # Demo Firebase config
└── ...
```

## Key Components

### Authentication System
- Demo authentication that works without real Firebase
- Persistent sessions using localStorage
- Google OAuth simulation

### Wallet Management
- Multi-wallet connection support
- Default wallet selection
- Transaction history tracking
- Mock and real MetaMask integration

### Payment System
- QR code scanning and parsing
- Crypto to fiat conversion
- Mock blockchain transactions
- Razorpay integration simulation

### UI/UX Features
- Smooth animations with Framer Motion
- Responsive mobile-first design
- Dark theme with purple/violet gradients
- Interactive components and micro-interactions

## Customization

### Adding Real Firebase
Replace the demo Firebase config in `lib/firebase.ts` with your actual Firebase configuration.

### Blockchain Integration
Update `lib/contracts.ts` to connect to real smart contracts and blockchain networks.

### Styling
Modify `tailwind.config.ts` and component styles to match your design requirements.

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
npm run vercel-build
```

## Browser Support

- Chrome/Chromium (recommended for MetaMask)
- Firefox
- Safari (limited wallet support)
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.