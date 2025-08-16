import Constants from 'expo-constants';

export interface AppConfig {
  appwrite: {
    endpoint: string;
    projectId: string;
    databaseId: string;
  };
  dtShop: {
    apiUrl: string;
    apiKey: string;
  };
  nium: {
    apiUrl: string;
    clientId: string;
    clientSecret: string;
  };
  stripe: {
    publishableKey: string;
  };
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
}

const developmentConfig: AppConfig = {
  appwrite: {
    endpoint: Constants.expoConfig?.extra?.appwriteEndpoint || 'https://cloud.appwrite.io/v1',
    projectId: Constants.expoConfig?.extra?.appwriteProjectId || '',
    databaseId: Constants.expoConfig?.extra?.appwriteDatabaseId || '',
  },
  dtShop: {
    apiUrl: Constants.expoConfig?.extra?.dtShopApiUrl || 'https://api.dtshop.com/v1',
    apiKey: Constants.expoConfig?.extra?.dtShopApiKey || '',
  },
  nium: {
    apiUrl: Constants.expoConfig?.extra?.niumApiUrl || 'https://api.nium.com/v1',
    clientId: Constants.expoConfig?.extra?.niumClientId || '',
    clientSecret: Constants.expoConfig?.extra?.niumClientSecret || '',
  },
  stripe: {
    publishableKey: Constants.expoConfig?.extra?.stripePublishableKey || '',
  },
  app: {
    name: 'Mobile Recharge App (Dev)',
    version: '1.0.0',
    environment: 'development',
  },
};

const stagingConfig: AppConfig = {
  appwrite: {
    endpoint: Constants.expoConfig?.extra?.appwriteEndpoint || 'https://cloud.appwrite.io/v1',
    projectId: Constants.expoConfig?.extra?.appwriteProjectId || '',
    databaseId: Constants.expoConfig?.extra?.appwriteDatabaseId || '',
  },
  dtShop: {
    apiUrl: Constants.expoConfig?.extra?.dtShopApiUrl || 'https://api.dtshop.com/v1',
    apiKey: Constants.expoConfig?.extra?.dtShopApiKey || '',
  },
  nium: {
    apiUrl: Constants.expoConfig?.extra?.niumApiUrl || 'https://api.nium.com/v1',
    clientId: Constants.expoConfig?.extra?.niumClientId || '',
    clientSecret: Constants.expoConfig?.extra?.niumClientSecret || '',
  },
  stripe: {
    publishableKey: Constants.expoConfig?.extra?.stripePublishableKey || '',
  },
  app: {
    name: 'Mobile Recharge App (Staging)',
    version: '1.0.0',
    environment: 'staging',
  },
};

const productionConfig: AppConfig = {
  appwrite: {
    endpoint: Constants.expoConfig?.extra?.appwriteEndpoint || 'https://cloud.appwrite.io/v1',
    projectId: Constants.expoConfig?.extra?.appwriteProjectId || '',
    databaseId: Constants.expoConfig?.extra?.appwriteDatabaseId || '',
  },
  dtShop: {
    apiUrl: Constants.expoConfig?.extra?.dtShopApiUrl || 'https://api.dtshop.com/v1',
    apiKey: Constants.expoConfig?.extra?.dtShopApiKey || '',
  },
  nium: {
    apiUrl: Constants.expoConfig?.extra?.niumApiUrl || 'https://api.nium.com/v1',
    clientId: Constants.expoConfig?.extra?.niumClientId || '',
    clientSecret: Constants.expoConfig?.extra?.niumClientSecret || '',
  },
  stripe: {
    publishableKey: Constants.expoConfig?.extra?.stripePublishableKey || '',
  },
  app: {
    name: 'Mobile Recharge & Remittance',
    version: '1.0.0',
    environment: 'production',
  },
};

function getConfig(): AppConfig {
  const environment = Constants.expoConfig?.extra?.environment || 'development';
  
  switch (environment) {
    case 'staging':
      return stagingConfig;
    case 'production':
      return productionConfig;
    default:
      return developmentConfig;
  }
}

export const config = getConfig();