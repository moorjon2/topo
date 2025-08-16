const sdk = require('node-appwrite');

// Initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

/**
 * Fraud detection function for transactions
 * Analyzes transaction patterns and flags suspicious activity
 */
module.exports = async ({ req, res, log, error }) => {
  try {
    const { userId, transactionData } = JSON.parse(req.body);
    
    if (!userId || !transactionData) {
      return res.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }

    // Get user's recent transactions
    const recentTransactions = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      'transactions',
      [
        sdk.Query.equal('userId', userId),
        sdk.Query.greaterThan('$createdAt', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        sdk.Query.orderDesc('$createdAt'),
        sdk.Query.limit(50)
      ]
    );

    const fraudScore = calculateFraudScore(transactionData, recentTransactions.documents);
    const riskLevel = getRiskLevel(fraudScore);
    
    // Log fraud analysis
    log(`Fraud analysis for user ${userId}: Score ${fraudScore}, Risk ${riskLevel}`);
    
    // Store fraud analysis result
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      'fraud_analysis',
      sdk.ID.unique(),
      {
        userId,
        transactionId: transactionData.id,
        fraudScore,
        riskLevel,
        factors: getFraudFactors(transactionData, recentTransactions.documents),
        timestamp: new Date().toISOString()
      }
    );

    return res.json({
      success: true,
      fraudScore,
      riskLevel,
      requiresReview: riskLevel === 'high',
      requiresAdditionalAuth: riskLevel === 'medium' || riskLevel === 'high'
    });

  } catch (err) {
    error('Fraud detection error: ' + err.message);
    return res.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
};

function calculateFraudScore(transaction, recentTransactions) {
  let score = 0;
  
  // Check transaction amount patterns
  const amounts = recentTransactions.map(t => t.amount);
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length || 0;
  
  if (transaction.amount > avgAmount * 5) {
    score += 30; // Unusually high amount
  }
  
  // Check frequency patterns
  const last24hCount = recentTransactions.length;
  if (last24hCount > 10) {
    score += 25; // Too many transactions
  }
  
  // Check for rapid successive transactions
  const last5min = recentTransactions.filter(t => 
    new Date(t.$createdAt) > new Date(Date.now() - 5 * 60 * 1000)
  );
  if (last5min.length > 3) {
    score += 20; // Rapid transactions
  }
  
  // Check for unusual recipient patterns
  const recipients = recentTransactions.map(t => JSON.parse(t.recipient).phoneNumber || JSON.parse(t.recipient).email);
  const uniqueRecipients = [...new Set(recipients)];
  if (uniqueRecipients.length > 10) {
    score += 15; // Too many different recipients
  }
  
  return Math.min(score, 100);
}

function getRiskLevel(score) {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function getFraudFactors(transaction, recentTransactions) {
  const factors = [];
  
  const amounts = recentTransactions.map(t => t.amount);
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length || 0;
  
  if (transaction.amount > avgAmount * 5) {
    factors.push('unusual_amount');
  }
  
  if (recentTransactions.length > 10) {
    factors.push('high_frequency');
  }
  
  const last5min = recentTransactions.filter(t => 
    new Date(t.$createdAt) > new Date(Date.now() - 5 * 60 * 1000)
  );
  if (last5min.length > 3) {
    factors.push('rapid_transactions');
  }
  
  return factors;
}