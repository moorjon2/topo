import { realtime, DATABASE_ID, COLLECTIONS } from './client';

export class RealtimeService {
  subscribeToMessages(conversationId: string, callback: (payload: any) => void) {
    return realtime.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTIONS.MESSAGES}.documents`,
      (response) => {
        // Filter messages for specific conversation
        if (response.payload.conversationId === conversationId) {
          callback(response);
        }
      }
    );
  }

  subscribeToConversations(userId: string, callback: (payload: any) => void) {
    return realtime.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTIONS.CONVERSATIONS}.documents`,
      (response) => {
        // Filter conversations for specific user
        if (response.payload.participants?.includes(userId)) {
          callback(response);
        }
      }
    );
  }

  subscribeToTransactions(userId: string, callback: (payload: any) => void) {
    return realtime.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTIONS.TRANSACTIONS}.documents`,
      (response) => {
        // Filter transactions for specific user
        if (response.payload.userId === userId) {
          callback(response);
        }
      }
    );
  }

  subscribeToUserUpdates(userId: string, callback: (payload: any) => void) {
    return realtime.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTIONS.USERS}.documents.${userId}`,
      callback
    );
  }
}