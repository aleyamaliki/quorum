# Quorum - Decentralized Governance Platform

A modern, production-ready decentralized governance and liquidity pool management platform built with React, TypeScript, Tailwind CSS, and React Router.

🚀 **[Live Demo](https://quorum-web3.netlify.app/)** (Replace with your actual Netlify URL)

## Features

### Wallet Integration
- **Connect Wallet**: Full MetaMask and Web3 wallet integration
- **Auto-reconnect**: Maintains connection state across sessions
- **Demo Mode**: Works without wallet for testing and exploration
- **Real-time Balance**: Displays SOL balance and wallet address
- **Account Switching**: Handles account changes automatically

### Governance System
- **Vote on Proposals**: Interactive voting with real-time vote counting
- **Create Proposals**: Submit new governance proposals
- **Proposal Status**: Track active, passed, and rejected proposals
- **Voting Power**: Display your governance influence
- **Vote History**: View your past voting decisions

### Liquidity Pools
- **Stake Tokens**: Deposit tokens into liquidity pools
- **Real-time Rewards**: Automatic reward accumulation
- **Multiple Pools**: Support for various token pairs
- **APY Display**: Clear annual percentage yield for each pool
- **Withdraw & Claim**: Easy reward claiming and unstaking
- **Pool Filtering**: Sort and filter pools by various criteria

### User Profile
- **Activity History**: Complete transaction timeline
- **Achievement Badges**: Earn NFT badges for milestones
- **Custom Username**: Set and display your username
- **Statistics Dashboard**: Track your participation metrics
- **Voting Power**: View your governance weight

### Design & UX
- **Custom Color Palette**: Warm, earthy tones (#706d54, #a08963, #c9b194, #dbdbdb)
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Sidebar Navigation**: Clean, accessible navigation with search
- **Interactive Elements**: Smooth animations and transitions
- **Error Handling**: Comprehensive edge case management
- **Loading States**: Clear feedback for async operations

## Tech Stack

- **React 19.1**: Latest React with modern hooks
- **TypeScript 5.9**: Full type safety
- **Tailwind CSS 3.4**: Modern utility-first CSS
- **React Router 7.9**: Client-side routing
- **Vite 7.1**: Fast build tool and dev server
- **Framer Motion 12**: Smooth animations
- **Lucide React**: Beautiful icon library

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ConnectWallet.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── contexts/           # React Context providers
│   └── WalletContext.tsx
├── pages/              # Route pages
│   ├── Home.tsx
│   ├── Pools.tsx
│   ├── Votes.tsx
│   └── Profile.tsx
├── types/              # TypeScript type definitions
│   └── wallet.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles and Tailwind config
```

## Key Features Implementation

### Wallet Connection
- Supports MetaMask and other Web3 wallets
- Falls back to demo mode without wallet
- Persists connection state in localStorage
- Handles account and chain changes

### Interactive Pools
- Live stake/unstake functionality
- Real-time reward calculations
- Responsive modal interfaces
- Progress bars and status indicators

### Governance Voting
- Vote for/against proposals
- Create new proposals
- Visual vote distribution
- Proposal filtering and sorting

### Profile Management
- Editable username
- Activity timeline
- Achievement tracking with progress bars
- Comprehensive statistics

## Error Handling

The application includes comprehensive error handling for:
- Wallet connection failures
- Network errors
- Invalid input validation
- Missing data scenarios
- Async operation failures

## Best Practices

- **Type Safety**: Full TypeScript coverage
- **Component Composition**: Reusable, modular components
- **State Management**: Context API for global state
- **Performance**: Optimized re-renders with proper hooks
- **Accessibility**: Semantic HTML and ARIA labels
- **Responsive**: Mobile-first design approach
- **Error Boundaries**: Graceful error handling

## Color Palette

The design uses a warm, earthy color scheme:
- Primary Dark: `#706d54`
- Primary: `#a08963`
- Primary Light: `#c9b194`
- Neutral Light: `#dbdbdb`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
