import { databases, DATABASE_ID, COLLECTIONS } from './client';
import { ID, Query } from 'appwrite';

export class DatabaseService {
  async createDocument(collectionId: string, data: any, documentId?: string) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        collectionId,
        documentId || ID.unique(),
        data
      );
      return { success: true, document };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async getDocument(collectionId: string, documentId: string) {
    try {
      const document = await databases.getDocument(
        DATABASE_ID,
        collectionId,
        documentId
      );
      return { success: true, document };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async updateDocument(collectionId: string, documentId: string, data: any) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        collectionId,
        documentId,
        data
      );
      return { success: true, document };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async deleteDocument(collectionId: string, documentId: string) {
    try {
      await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async listDocuments(collectionId: string, queries?: string[]) {
    try {
      const documents = await databases.listDocuments(
        DATABASE_ID,
        collectionId,
        queries
      );
      return { success: true, documents };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  // User-specific methods
  async createUser(userData: any) {
    return this.createDocument(COLLECTIONS.USERS, userData);
  }

  async getUser(userId: string) {
    return this.getDocument(COLLECTIONS.USERS, userId);
  }

  async updateUser(userId: string, userData: any) {
    return this.updateDocument(COLLECTIONS.USERS, userId, userData);
  }

  // Transaction methods
  async createTransaction(transactionData: any) {
    return this.createDocument(COLLECTIONS.TRANSACTIONS, transactionData);
  }

  async getUserTransactions(userId: string) {
    return this.listDocuments(COLLECTIONS.TRANSACTIONS, [
      Query.equal('userId', userId),
      Query.orderDesc('createdAt')
    ]);
  }

  // Conversation methods
  async createConversation(conversationData: any) {
    return this.createDocument(COLLECTIONS.CONVERSATIONS, conversationData);
  }

  async getUserConversations(userId: string) {
    return this.listDocuments(COLLECTIONS.CONVERSATIONS, [
      Query.contains('participants', userId),
      Query.orderDesc('lastActivity')
    ]);
  }

  // Message methods
  async createMessage(messageData: any) {
    return this.createDocument(COLLECTIONS.MESSAGES, messageData);
  }

  async getConversationMessages(conversationId: string) {
    return this.listDocuments(COLLECTIONS.MESSAGES, [
      Query.equal('conversationId', conversationId),
      Query.orderAsc('timestamp')
    ]);
  }
}