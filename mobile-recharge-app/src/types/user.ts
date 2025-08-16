export interface User {
  id: string;
  email: string;
  username: string;
  cashtag: string;
  phoneNumber?: string;
  profilePicture?: string;
  verificationStatus: {
    email: boolean;
    phone: boolean;
    bankAccount: boolean;
    debitCard: boolean;
  };
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    allowSearchByPhone: boolean;
  };
  language: string;
  currency: string;
}