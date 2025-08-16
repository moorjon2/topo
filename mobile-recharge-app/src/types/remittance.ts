export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: Date;
}

export interface FeeStructure {
  baseFee: number;
  percentageFee: number;
  totalFee: number;
  currency: string;
}

export interface RecipientDetails {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  address: Address;
  bankAccount?: BankAccount;
  idDocument: IdDocument;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface BankAccount {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  accountType: 'checking' | 'savings';
}

export interface IdDocument {
  type: 'passport' | 'national_id' | 'drivers_license';
  number: string;
  expiryDate: Date;
}

export interface TransferRequest {
  senderId: string;
  recipientDetails: RecipientDetails;
  amount: number;
  currency: string;
  purpose: string;
  paymentMethodId: string;
}

export interface TransferResult {
  transferId: string;
  status: 'initiated' | 'processing' | 'completed' | 'failed';
  estimatedDelivery: Date;
  trackingReference: string;
}

export interface TransferStatus {
  transferId: string;
  status: string;
  statusMessage: string;
  lastUpdated: Date;
  estimatedDelivery?: Date;
}