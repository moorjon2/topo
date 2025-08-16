export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account' | 'apple_pay' | 'google_pay';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  requiresAction?: boolean;
}

export interface ApplePayRequest {
  amount: number;
  currency: string;
  merchantId: string;
  countryCode: string;
}

export interface GooglePayRequest {
  amount: number;
  currency: string;
  merchantId: string;
  countryCode: string;
}