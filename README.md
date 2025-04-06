# Ansh & Riley Full-Stack Template

This is a full-stack template project for Software Composers to create  applications with AI.

## Getting started
To create a new project, you go to `/paths`, choose from our list of Paths, and then use Cursor's Composer feature to quickly scaffold your project!

You can also edit the Path's prompt template to be whatever you like!

## Technologies used
This doesn't really matter, but is useful for the AI to understand more about this project. We are using the following technologies
- React with Next.js 14 App Router
- TailwindCSS
- Firebase Auth, Storage, and Database
- Multiple AI endpoints including OpenAI, Anthropic, and Replicate using Vercel's AI SDK

# InsightLens AI - Learning Enhanced by AI

InsightLens AI is a powerful learning platform that uses artificial intelligence to help students and learners master content more effectively. The platform offers a range of tools including text summarization, flashcard creation, quiz generation, and more.

## Features

- **AI-Powered Summarization**: Upload documents or paste text to get concise summaries
- **Smart Flashcards**: Generate study-ready flashcards from your notes or readings
- **Quiz Generation**: Test your knowledge with AI-generated quizzes
- **Chrome Extension**: Use InsightLens AI while browsing the web
- **Firebase Authentication**: Secure user authentication system
- **Stripe Payment Integration**: Subscription management for premium features

## Stripe Payment Integration

The application includes a complete Stripe payment flow for handling subscriptions:

1. **Free Trial**: Users can start a 3-day free trial of the Pro plan
2. **Subscription Management**: Users can view and manage their subscription in the dashboard
3. **Webhook Handling**: The application processes Stripe webhooks to keep subscription status up to date

### Payment Flow

1. User selects the Pro plan on the pricing page
2. User enters their payment information in the StripeCheckout component
3. The application creates a subscription with a trial period
4. After the trial ends, the user is charged the monthly subscription fee
5. Users can cancel their subscription at any time from the settings page

### Technical Implementation

- `src/app/components/StripeCheckout.tsx`: The checkout form component
- `src/app/components/PricingSection.tsx`: The pricing section with plan options
- `src/app/api/stripe/create-checkout/route.ts`: API route for creating subscriptions
- `src/app/api/stripe/webhook/route.ts`: API route for handling Stripe webhooks
- `src/app/dashboard/settings/page.tsx`: Settings page with subscription management

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   OPENAI_API_KEY=your_openai_api_key
   
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Next Steps

To fully implement Stripe in production:

1. Create a Stripe account and get API keys
2. Replace the simulated Stripe implementation with actual Stripe API calls
3. Set up a proper webhook endpoint with signature verification
4. Use Stripe Customer Portal for subscription management
5. Implement proper error handling and recovery mechanisms

## Notes for Developers

- The current implementation simulates Stripe functionality for development purposes
- In production, you should use the official Stripe library and follow security best practices
- Make sure to test the subscription flow thoroughly before going live
- Consider adding payment confirmation emails and notifications

## Project Structure

- `/src` - Next.js web application
- `/chrome-extension` - Chrome extension source files

## Getting Started

### Prerequisites

- Node.js (version 18.x or later)
- npm or yarn
- Firebase account
- API keys for various services

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env.local` file in the root directory with the following environment variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Anthropic Configuration 
ANTHROPIC_API_KEY=your_anthropic_api_key

# Replicate Configuration
REPLICATE_API_TOKEN=your_replicate_api_token

# Deepgram Configuration
DEEPGRAM_API_KEY=your_deepgram_api_key
```

4. Start the development server:
```bash
npm run dev
```

### Setting Up API Keys

#### Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Under Project Settings > General, scroll down to "Your apps" and click the Web icon
4. Register your app and copy the Firebase configuration
5. Enable Authentication, Firestore Database, and Storage in the Firebase Console

#### OpenAI API

1. Visit [OpenAI API](https://platform.openai.com/)
2. Create an account or log in
3. Navigate to the API Keys section
4. Create a new secret key and copy it

#### Anthropic API 

1. Visit [Anthropic](https://console.anthropic.com/)
2. Create an account or log in
3. Navigate to the API Keys section
4. Create a new API key and copy it

#### Replicate API

1. Go to [Replicate](https://replicate.com/)
2. Create an account or log in
3. Go to your account settings
4. Find or create your API token and copy it

#### Deepgram API

1. Visit [Deepgram](https://console.deepgram.com/)
2. Create an account or log in
3. Navigate to the API Keys section
4. Create a new API key and copy it

### Building the Chrome Extension

1. Update the manifest.json file in the chrome-extension directory with your specific configuration
2. Navigate to the chrome-extension directory:
```bash
cd chrome-extension
```
3. Build the extension:
```bash
npm install
npm run build
```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `chrome-extension/build` directory

## Deployment

### Web App

The web app can be deployed using Vercel:

```bash
npm install -g vercel
vercel
```

### Chrome Extension

1. Build the production version of the extension:
```bash
cd chrome-extension
npm run build
```
2. Create a ZIP file of the build directory
3. Upload to the Chrome Web Store Developer Dashboard

## License

[MIT](LICENSE)

# StudyLens AI

StudyLens AI is a comprehensive AI-powered homework assistant platform that helps students excel in their studies by providing step-by-step problem solving, essay assistance, and study tools.

## Features

### 🌐 Web Application
- **AI Chat Assistant**: Get instant answers to academic questions in any subject
- **Document Analysis**: Upload study materials and get detailed explanations
- **Essay Writing Support**: Generate essays, outlines, and revisions
- **User Dashboard**: Track usage, save favorite answers, and manage your account

### 🔍 Chrome Extension
- **Instant Screenshots**: Capture questions and get immediate answers
- **Cross-Platform Support**: Works with all major learning platforms including Moodle, Blackboard, Canvas, D2L, Google Classroom, and more
- **Context-Aware Assistance**: Extension understands the learning context for better answers

### 📱 Mobile Application
- **Camera Scanning**: Take a picture of any problem to get instant solutions
- **Step-by-Step Solving**: Watch AI break down problems with detailed explanations
- **Offline Support**: Access your history and saved items without internet

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Firebase account for authentication and database
- OpenAI API key or Anthropic API key for AI features

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/studylens-ai.git
cd studylens-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following variables:
```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Replicate (for image generation)
REPLICATE_API_TOKEN=your_replicate_token

# Deepgram (for audio transcription)
NEXT_PUBLIC_DEEPGRAM_API_KEY=your_deepgram_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/src
  /app                  # Next.js App Router pages
    /api                # API routes
      /anthropic        # Anthropic AI API
      /openai           # OpenAI API
      /replicate        # Replicate API (image generation)
      /deepgram         # Deepgram API (audio transcription)
    /components         # Shared UI components
    /dashboard          # Dashboard pages
    page.tsx            # Landing page
  /lib
    /contexts           # Context providers
    /firebase           # Firebase configuration
    /hooks              # Custom React hooks
```

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Firebase
- **AI**: OpenAI, Anthropic Claude, Replicate, Deepgram
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for GPT models
- Anthropic for Claude
- Replicate for image generation capabilities
- Deepgram for audio transcription
- Firebase for authentication and database services
- Vercel for hosting and deployment