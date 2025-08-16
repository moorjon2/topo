import { Client, Account, Databases, Realtime, Functions, Storage } from 'appwrite';
import { config } from '../../config/environment';

// Initialize Appwrite client
export const client = new Client()
  .setEndpoint(config.appwrite.endpoint)
  .setProject(config.appwrite.projectId);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const realtime = new Realtime(client);
export const functions = new Functions(client);
export const storage = new Storage(client);

// Database and collection IDs
export const DATABASE_ID = config.appwrite.databaseId;

export const COLLECTIONS = {
  USERS: 'users',
  TRANSACTIONS: 'transactions',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  PAYMENT_METHODS: 'payment_methods',
} as const;