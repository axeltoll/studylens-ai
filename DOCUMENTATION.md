# StudyLens AI Documentation

This document provides comprehensive technical documentation for the StudyLens AI platform.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication System](#authentication-system)
3. [AI Integration](#ai-integration)
4. [Frontend Components](#frontend-components)
5. [API Routes](#api-routes)
6. [Chrome Extension](#chrome-extension)
7. [Mobile App Integration](#mobile-app-integration)
8. [Deployment Guidelines](#deployment-guidelines)

## Architecture Overview

StudyLens AI is built using a modern web stack centered around Next.js 14 with the App Router architecture. The application follows a client-server model where the frontend is served by Next.js and backend functionality is provided through Next.js API routes (Edge runtime) and Firebase services.

### Key Components:

- **Frontend:** React components with TypeScript, styled using Tailwind CSS
- **State Management:** React Context API and custom hooks
- **Backend:** Next.js API routes with Edge runtime for AI processing
- **Database:** Firebase Firestore for user data and study history
- **Authentication:** Firebase Authentication
- **Storage:** Firebase Storage for document uploads
- **AI Services:** OpenAI, Anthropic, Replicate, and Deepgram APIs

### Directory Structure:

```
/src
  /app                  # Next.js App Router pages and layouts
    /api                # API routes
      /anthropic        # Anthropic AI routes
      /openai           # OpenAI routes  
      /replicate        # Replicate routes
      /deepgram         # Deepgram routes
      /auth             # Authentication routes
    /components         # Shared UI components
    /dashboard          # Dashboard pages
    page.tsx            # Landing page
  /lib
    /contexts           # Context providers
    /firebase           # Firebase configuration
    /hooks              # Custom React hooks
    /utils              # Utility functions
```

## Authentication System

StudyLens AI uses Firebase Authentication for user management. The auth system supports:

- Email/password authentication
- Google OAuth authentication
- Password reset functionality
- User profile management

### Implementation Details:

Authentication is managed through the `AuthContext` in `/src/lib/contexts/AuthContext.tsx`, which provides:

- User state management
- Sign-in methods (email/password, Google)
- Sign-up method
- Sign-out method
- Loading state for auth operations

The auth state is made available throughout the application via the `useAuth` hook in `/src/lib/hooks/useAuth.ts`.

### Authentication Flow:

1. User initiates sign-in/sign-up through the `LoginModal` component
2. Auth request is processed by Firebase Authentication
3. On successful authentication, user data is stored in the AuthContext
4. Authenticated users are redirected to the dashboard

## AI Integration

StudyLens AI integrates with multiple AI services to provide its core functionality:

### OpenAI Integration

Used for general Q&A, text summarization, and essay writing assistance. The integration is implemented in `/src/app/api/openai/chat/route.ts`.

Key features:
- Streaming responses for real-time feedback
- Context-aware conversation handling
- Subject-specific prompting

### Anthropic Integration

Used for detailed explanations and study plans. The integration is implemented in `/src/app/api/anthropic/chat/route.ts`.

Key features:
- Claude model access
- Structured content generation
- Enhanced reasoning capabilities

### Replicate Integration

Used for image generation and visual content analysis. The integration is implemented in `/src/app/api/replicate/generate-image/route.ts`.

### Deepgram Integration

Used for speech-to-text transcription. The integration is implemented in `/src/app/api/deepgram/transcribe-audio/route.ts`.

## Frontend Components

The application includes several key UI components:

### Core Components:

- **LoginModal:** Handles user authentication
- **AIAssistant:** Main chat interface for AI interactions
- **Sidebar:** Dashboard navigation menu
- **DashboardLayout:** Container layout for dashboard pages
- **TrialCheckoutModal:** Payment processing for trial subscription

### UI Components:

- All UI components use Tailwind CSS for styling
- Interactive elements use Framer Motion for animations
- Icons from Lucide React library

## API Routes

All API routes are implemented using Next.js API Routes with Edge Runtime where possible for improved performance.

### Authentication Routes:

- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate an existing user

### AI Routes:

- `POST /api/openai/chat` - OpenAI chat completion endpoint
- `POST /api/anthropic/chat` - Anthropic chat completion endpoint
- `POST /api/replicate/generate-image` - Image generation endpoint
- `POST /api/deepgram/transcribe-audio` - Audio transcription endpoint

### User Data Routes:

- `GET /api/user/history` - Retrieve user's chat history
- `POST /api/user/history` - Save a new chat session
- `DELETE /api/user/history/:id` - Delete a chat session

## Chrome Extension

The Chrome extension is designed to integrate with various learning management systems (LMS) and educational websites.

### Extension Structure:

- Manifest v3 compatible
- Content scripts for web page integration
- Background service worker for API communication
- Popup UI for user interaction

### Supported Platforms:

- Moodle
- Blackboard
- Canvas
- D2L
- Google Classroom
- Schoology
- Khan Academy
- TopHat
- ClassMarker
- Various exam platforms

## Mobile App Integration

The mobile app is designed as a companion to the web platform, providing on-the-go access to StudyLens AI features.

### Implementation Options:

1. **React Native:** For cross-platform compatibility
2. **Swift/SwiftUI:** For iOS-specific optimizations
3. **Kotlin:** For Android-specific optimizations

### Key Features:

- Camera integration for scanning questions
- Image processing and OCR
- Real-time AI chat
- Offline access to saved content

## Deployment Guidelines

### Prerequisites:

- Node.js 18.x or higher
- Yarn or npm
- Firebase project set up with Authentication, Firestore, and Storage
- API keys for OpenAI, Anthropic, Replicate, and Deepgram

### Development Deployment:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Run development server:
   ```bash
   npm run dev
   ```

### Production Deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

### Environment Variables:

Ensure the following environment variables are set in your deployment environment:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# OpenAI
OPENAI_API_KEY

# Anthropic
ANTHROPIC_API_KEY

# Replicate
REPLICATE_API_TOKEN

# Deepgram
NEXT_PUBLIC_DEEPGRAM_API_KEY
```

### Recommended Hosting:

- **Frontend & API Routes:** Vercel (optimized for Next.js)
- **Database & Auth:** Firebase (built-in scalability)
- **Media Storage:** Firebase Storage or dedicated CDN 