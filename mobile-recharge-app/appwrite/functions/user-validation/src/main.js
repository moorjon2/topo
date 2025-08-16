const sdk = require('node-appwrite');

// Initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

/**
 * User validation function
 * Validates usernames, cashtags, and phone numbers for uniqueness
 */
module.exports = async ({ req, res, log, error }) => {
  try {
    const { type, value, userId } = JSON.parse(req.body);
    
    if (!type || !value) {
      return res.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }

    let isValid = false;
    let errorMessage = '';

    switch (type) {
      case 'username':
        const usernameResult = await validateUsername(value, userId);
        isValid = usernameResult.isValid;
        errorMessage = usernameResult.error;
        break;
        
      case 'cashtag':
        const cashtagResult = await validateCashtag(value, userId);
        isValid = cashtagResult.isValid;
        errorMessage = cashtagResult.error;
        break;
        
      case 'phone':
        const phoneResult = await validatePhoneNumber(value, userId);
        isValid = phoneResult.isValid;
        errorMessage = phoneResult.error;
        break;
        
      default:
        return res.json({
          success: false,
          error: 'Invalid validation type'
        }, 400);
    }

    return res.json({
      success: true,
      isValid,
      error: errorMessage
    });

  } catch (err) {
    error('User validation error: ' + err.message);
    return res.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
};

async function validateUsername(username, excludeUserId) {
  // Check format
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    return {
      isValid: false,
      error: 'Username must be 3-30 characters and contain only letters, numbers, and underscores'
    };
  }

  // Check for reserved words
  const reservedWords = ['admin', 'support', 'help', 'api', 'www', 'mail', 'ftp'];
  if (reservedWords.includes(username.toLowerCase())) {
    return {
      isValid: false,
      error: 'This username is reserved'
    };
  }

  // Check uniqueness
  const queries = [sdk.Query.equal('username', username)];
  if (excludeUserId) {
    queries.push(sdk.Query.notEqual('userId', excludeUserId));
  }

  const existingUsers = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'users',
    queries
  );

  if (existingUsers.documents.length > 0) {
    return {
      isValid: false,
      error: 'Username is already taken'
    };
  }

  return { isValid: true, error: '' };
}

async function validateCashtag(cashtag, excludeUserId) {
  // Remove $ prefix if present
  const cleanCashtag = cashtag.startsWith('$') ? cashtag.slice(1) : cashtag;

  // Check format
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanCashtag)) {
    return {
      isValid: false,
      error: 'Cashtag must be 3-30 characters and contain only letters, numbers, and underscores'
    };
  }

  // Check uniqueness
  const queries = [sdk.Query.equal('cashtag', cleanCashtag)];
  if (excludeUserId) {
    queries.push(sdk.Query.notEqual('userId', excludeUserId));
  }

  const existingUsers = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'users',
    queries
  );

  if (existingUsers.documents.length > 0) {
    return {
      isValid: false,
      error: 'Cashtag is already taken'
    };
  }

  return { isValid: true, error: '' };
}

async function validatePhoneNumber(phoneNumber, excludeUserId) {
  // Basic phone number format validation
  if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
    return {
      isValid: false,
      error: 'Phone number must be in international format (+1234567890)'
    };
  }

  // Check uniqueness
  const queries = [sdk.Query.equal('phoneNumber', phoneNumber)];
  if (excludeUserId) {
    queries.push(sdk.Query.notEqual('userId', excludeUserId));
  }

  const existingUsers = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'users',
    queries
  );

  if (existingUsers.documents.length > 0) {
    return {
      isValid: false,
      error: 'Phone number is already registered'
    };
  }

  return { isValid: true, error: '' };
}