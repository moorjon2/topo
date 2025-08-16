# Mobile Recharge & Remittance App

A React Native application built with Expo that enables users to perform mobile phone top-ups for South American countries, send cross-border money transfers, and engage in secure one-on-one chat with integrated payment features.

## Features

- **Mobile Recharge**: Top up mobile phones in South America via DT SHOP API
- **Cross-border Remittance**: Send money internationally via Nium API
- **Secure Chat**: Real-time messaging with integrated payment requests
- **Payment Processing**: Secure payments via Stripe with Apple Pay/Google Pay support
- **User Authentication**: Social login (Gmail, iCloud) and traditional email/password
- **Account Verification**: Multi-step verification for enhanced features

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Appwrite (BaaS)
- **State Management**: Redux Toolkit
- **UI Library**: React Native Paper
- **Navigation**: React Navigation v6
- **Payment Processing**: Stripe
- **External APIs**: DT SHOP (recharge), Nium (remittance)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat-related components
│   ├── common/         # Common/shared components
│   ├── profile/        # Profile management components
│   ├── recharge/       # Mobile recharge components
│   └── remittance/     # Remittance components
├── config/             # Configuration files
├── navigation/         # Navigation setup
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── chat/           # Chat screens
│   ├── history/        # Transaction history screens
│   ├── home/           # Home screen
│   ├── profile/        # Profile screens
│   ├── recharge/       # Recharge screens
│   └── remittance/     # Remittance screens
├── services/           # API services and integrations
│   └── appwrite/       # Appwrite service wrappers
├── store/              # Redux store and slices
│   └── slices/         # Redux slices
└── types/              # TypeScript type definitions
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Appwrite account and project
- Stripe account
- DT SHOP API access
- Nium API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-recharge-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update the values in `.env` with your actual API keys and configuration:
   - Get Appwrite credentials from your Appwrite console
   - Obtain DT SHOP API key for mobile recharge services
   - Get Nium API credentials for remittance services
   - Set up Stripe keys for payment processing

4. **Configure Appwrite**
   
   - Create an Appwrite project
   - Update the project ID in your environment file
   - Deploy the database schema:
   ```bash
   cd scripts
   npm install
   npm run deploy-schema
   ```

5. **Configure app.json**
   
   The `app.json` file is already configured to read from environment variables. 
   Make sure your `.env` file is properly set up as the app.json references these variables.

### Running the App

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on specific platform**
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## Environment Configuration

The app supports multiple environments:

- **Development**: `.env.development`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

Key environment variables:

- `APPWRITE_ENDPOINT`: Appwrite server endpoint
- `APPWRITE_PROJECT_ID`: Appwrite project ID
- `APPWRITE_DATABASE_ID`: Appwrite database ID
- `DTSHOP_API_KEY`: DT SHOP API key
- `NIUM_CLIENT_ID`: Nium client ID
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

## Appwrite Backend

### Database Collections

- **users**: User profiles and preferences
- **transactions**: Transaction records
- **conversations**: Chat conversations
- **messages**: Chat messages
- **payment_methods**: Stored payment methods

### Functions

- **fraud-detection**: Analyzes transaction patterns for fraud
- **transaction-callback**: Handles callbacks from payment providers
- **user-validation**: Validates usernames, cashtags, and phone numbers

### Permissions

Collections use user-based permissions:
- `read("user:self")`: Users can read their own data
- `write("user:self")`: Users can write their own data
- `create("users")`: Authenticated users can create documents

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations

### State Management

- Use Redux Toolkit for global state
- Keep component state local when possible
- Use async thunks for API calls
- Implement proper error handling in reducers

### Security

- Never commit API keys or secrets
- Use environment variables for configuration
- Implement proper input validation
- Follow secure coding practices for financial data

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Building for Production

1. **Configure production environment**
   ```bash
   cp .env.production .env.local
   ```

2. **Build the app**
   ```bash
   expo build:ios     # iOS
   expo build:android # Android
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.