const sdk = require('node-appwrite');

// Initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);

/**
 * Transaction callback function
 * Handles callbacks from Stripe and syncs with Nium for remittances
 */
module.exports = async ({ req, res, log, error }) => {
  try {
    const { source, eventType, data } = JSON.parse(req.body);
    
    log(`Received callback from ${source}: ${eventType}`);
    
    switch (source) {
      case 'stripe':
        await handleStripeCallback(eventType, data, log, error);
        break;
      case 'nium':
        await handleNiumCallback(eventType, data, log, error);
        break;
      case 'dtshop':
        await handleDTShopCallback(eventType, data, log, error);
        break;
      default:
        throw new Error(`Unknown callback source: ${source}`);
    }

    return res.json({ success: true });

  } catch (err) {
    error('Transaction callback error: ' + err.message);
    return res.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
};

async function handleStripeCallback(eventType, data, log, error) {
  const { paymentIntentId, status, metadata } = data;
  
  log(`Processing Stripe event: ${eventType} for payment ${paymentIntentId}`);
  
  // Find transaction by payment intent ID
  const transactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    [sdk.Query.equal('externalTransactionId', paymentIntentId)]
  );
  
  if (transactions.documents.length === 0) {
    throw new Error(`Transaction not found for payment intent: ${paymentIntentId}`);
  }
  
  const transaction = transactions.documents[0];
  
  switch (eventType) {
    case 'payment_intent.succeeded':
      await updateTransactionStatus(transaction.$id, 'processing');
      
      // If this is a remittance, initiate Nium transfer
      if (transaction.type === 'remittance') {
        await initiateNiumTransfer(transaction, log);
      } else if (transaction.type === 'recharge') {
        await processDTShopRecharge(transaction, log);
      }
      break;
      
    case 'payment_intent.payment_failed':
      await updateTransactionStatus(transaction.$id, 'failed');
      break;
      
    case 'payment_intent.canceled':
      await updateTransactionStatus(transaction.$id, 'cancelled');
      break;
  }
}

async function handleNiumCallback(eventType, data, log, error) {
  const { transferId, status, statusMessage } = data;
  
  log(`Processing Nium event: ${eventType} for transfer ${transferId}`);
  
  // Find transaction by Nium transfer ID
  const transactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    [sdk.Query.equal('externalTransactionId', transferId)]
  );
  
  if (transactions.documents.length === 0) {
    throw new Error(`Transaction not found for transfer: ${transferId}`);
  }
  
  const transaction = transactions.documents[0];
  
  switch (status) {
    case 'COMPLETED':
      await updateTransactionStatus(transaction.$id, 'completed');
      break;
    case 'FAILED':
      await updateTransactionStatus(transaction.$id, 'failed');
      break;
    case 'CANCELLED':
      await updateTransactionStatus(transaction.$id, 'cancelled');
      break;
  }
}

async function handleDTShopCallback(eventType, data, log, error) {
  const { transactionId, status, message } = data;
  
  log(`Processing DT Shop event: ${eventType} for transaction ${transactionId}`);
  
  // Find transaction by DT Shop transaction ID
  const transactions = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    [sdk.Query.equal('externalTransactionId', transactionId)]
  );
  
  if (transactions.documents.length === 0) {
    throw new Error(`Transaction not found for DT Shop transaction: ${transactionId}`);
  }
  
  const transaction = transactions.documents[0];
  
  switch (status) {
    case 'SUCCESS':
      await updateTransactionStatus(transaction.$id, 'completed');
      break;
    case 'FAILED':
      await updateTransactionStatus(transaction.$id, 'failed');
      break;
  }
}

async function updateTransactionStatus(transactionId, status) {
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    transactionId,
    { 
      status,
      updatedAt: new Date().toISOString()
    }
  );
}

async function initiateNiumTransfer(transaction, log) {
  // This would integrate with Nium API to initiate the transfer
  log(`Initiating Nium transfer for transaction ${transaction.$id}`);
  
  // Update transaction with Nium transfer ID
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    transaction.$id,
    {
      status: 'processing',
      metadata: JSON.stringify({
        ...JSON.parse(transaction.metadata || '{}'),
        niumTransferInitiated: new Date().toISOString()
      })
    }
  );
}

async function processDTShopRecharge(transaction, log) {
  // This would integrate with DT Shop API to process the recharge
  log(`Processing DT Shop recharge for transaction ${transaction.$id}`);
  
  // Update transaction status
  await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID,
    'transactions',
    transaction.$id,
    {
      status: 'processing',
      metadata: JSON.stringify({
        ...JSON.parse(transaction.metadata || '{}'),
        dtShopRechargeInitiated: new Date().toISOString()
      })
    }
  );
}