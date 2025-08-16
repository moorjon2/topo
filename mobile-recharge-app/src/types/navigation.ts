import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Modal: NavigatorScreenParams<ModalStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Chat: NavigatorScreenParams<ChatStackParamList>;
  History: NavigatorScreenParams<HistoryStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { conversationId: string; recipientName: string };
  UserSearch: undefined;
};

export type HistoryStackParamList = {
  History: undefined;
  TransactionDetail: { transactionId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Verification: undefined;
  Settings: undefined;
};

export type ModalStackParamList = {
  Tabs: undefined;
  Recharge: undefined;
  RechargeConfirmation: {
    phoneNumber: string;
    amount: number;
    operator: string;
  };
  Remittance: undefined;
  RemittanceConfirmation: {
    recipient: string;
    amount: number;
    fees: number;
  };
};