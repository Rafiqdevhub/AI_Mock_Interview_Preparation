# JobPsych AI

Career Intelligence Assistant - Your AI-powered guide for career success, interview preparation, and professional development.

## Features

- **Career Intelligence**: Personalized career guidance and strategic advice
- **Interview Mastery**: AI-powered interview practice with realistic simulations
- **Skill Development**: Targeted learning resources and development plans
- **Voice Interaction**: Natural voice conversations with the AI assistant
- **Instant Feedback**: Comprehensive performance assessments and recommendations
- **Progress Tracking**: Detailed analytics and milestone monitoring
- **Technology Specific**: Practice for various roles and tech stacks
- **User Authentication**: Secure sign-in and sign-up functionality

## Tech Stack

This application is built with:

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Firebase & Firebase Admin** for authentication and database
- **Vapi.ai** for voice conversations
- **Google Gemini AI** for feedback generation
- **Tailwind CSS** for styling
- **Zod** for schema validation
- **React Hook Form** for form handling
- **Sonner** for toast notifications

## Prerequisites

Before getting started, make sure you have:

- Node.js 18.x or later
- npm or yarn or pnpm
- Firebase project (for authentication and Firestore)
- Vapi.ai API key (for voice interviews)
- Google Gemini API key (for AI feedback)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Vapi.ai
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Google AI
GOOGLE_AI_API_KEY=
```

## Getting Started

### Option 1: Local Development

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Option 2: Docker Deployment 🐳

**Quick Start with Docker:**

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t jobpsych-app .
docker run -p 3000:3000 --env-file .env.local jobpsych-app
```

**Using Makefile (Recommended):**

```bash
make build    # Build Docker image
make up       # Start containers
make logs     # View logs
make down     # Stop containers
make health   # Check health status
```

**For complete Docker deployment guide**, see [DOCKER.md](./DOCKER.md) which includes:

- Production deployment strategies
- Cloud platform deployment (AWS, GCP, Azure)
- Monitoring and troubleshooting
- Security best practices
- CI/CD pipelines

## Usage

1. **Sign Up/Sign In**: Create an account or sign in
2. **Start an Interview**: Choose "Start an Interview" from the homepage
3. **Configure Interview**: Select the role, experience level, and tech stack
4. **Complete Interview**: Answer questions asked by the AI interviewer via voice
5. **Review Feedback**: Get comprehensive feedback on your performance

## Project Structure

- **app/**: Next.js app router pages and layouts
  - **(auth)/**: Authentication-related pages (sign-in, sign-up)
  - **(root)/**: Main application pages
- **components/**: Reusable UI components
- **constants/**: Application constants and configurations
- **firebase/**: Firebase client and admin configurations
- **lib/**: Utility functions and server actions
  - **actions/**: Server actions for authentication and data operations
- **public/**: Static assets
- **types/**: TypeScript type definitions
