# Whiskey Wiz - Best React Version

This repository contains the best React version of the Whiskey Wiz application, a quarterly interactive whiskey tasting experience built with React and Firebase.

## Project Information

- **React Version:** 18.2.0+
- **Branch Source:** This code was extracted from the `feature/game-improvements-jan2025` branch of the original repository
- **Last Updated:** January 2025

## Overview

Whiskey Wiz is a gamified whiskey tasting application that integrates with Shopify pages. Players guess attributes of quarterly whiskey samples, earning points and sharing their results. This React implementation includes all the latest game improvements and features.

## Project Structure

```
src/
├── components/
│   ├── admin/            # Admin interface components
│   ├── game/             # Core game components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   └── shared/           # Reusable components
├── hooks/                # Custom React hooks
├── services/             # Firebase and API services
├── context/              # React context providers
├── utils/                # Utility functions
└── assets/               # Static assets and images
```

## Key Features

- Quarterly whiskey tasting games
- React components for Shopify integration
- Firebase backend with real-time updates
- Guest and authenticated play modes
- Admin interface for quarter management
- Advanced analytics tracking
- Mobile-optimized responsive design
- Score sharing functionality

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Deployment

The application is deployed to Firebase Hosting.

```bash
npm run deploy
```

## Shopify Integration

The React version can be integrated with Shopify using React components or by loading the built JS bundle directly.

## Environment Setup

Requires a .env file with Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## License

Proprietary - Blind Barrels © 2024