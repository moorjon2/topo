export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastActivity: Date;
  isArchived: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'transaction_request' | 'transaction_send' | 'system';
  content: string;
  transactionData?: TransactionData;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface TransactionData {
  type: 'money' | 'topup';
  amount: number;
  currency?: string;
  phoneNumber?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}