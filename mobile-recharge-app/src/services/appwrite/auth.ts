import { account } from './client';
import { ID } from 'appwrite';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export class AuthService {
  async login(credentials: LoginCredentials) {
    try {
      const session = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      return { success: true, session };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async register(credentials: RegisterCredentials) {
    try {
      const user = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async getCurrentUser() {
    try {
      const user = await account.get();
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async createOAuth2Session(provider: string) {
    try {
      account.createOAuth2Session(provider as any);
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }

  async sendPasswordRecovery(email: string) {
    try {
      await account.createRecovery(email, 'https://your-app.com/reset-password');
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}