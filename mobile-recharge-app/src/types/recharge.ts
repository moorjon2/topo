export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
}

export interface Operator {
  id: string;
  name: string;
  logo: string;
  countryCode: string;
}

export interface Denomination {
  amount: number;
  currency: string;
  localAmount?: number;
  localCurrency?: string;
}

export interface RechargeRequest {
  phoneNumber: string;
  countryCode: string;
  operatorId: string;
  amount: number;
  paymentMethodId: string;
}

export interface RechargeResult {
  transactionId: string;
  status: 'success' | 'failed' | 'pending';
  message: string;
  externalTransactionId?: string;
}