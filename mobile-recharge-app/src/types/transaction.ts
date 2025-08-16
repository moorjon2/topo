export interface Transaction {
  id: string;
  userId: string;
  type: 'recharge' | 'remittance' | 'chat_request' | 'chat_send';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  fees: number;
  exchangeRate?: number;
  recipient: RecipientInfo;
  paymentMethodId: string;
  externalTransactionId?: string;
  metadata: TransactionMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipientInfo {
  name?: string;
  phoneNumber?: string;
  email?: string;
  bankAccount?: string;
  country: string;
}

export interface TransactionMetadata {
  operator?: string;
  country?: string;
  purpose?: string;
  notes?: string;
  [key: string]: any;
}