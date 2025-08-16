const { Client, Databases, Functions, ID } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const functions = new Functions(client);

async function deploySchema() {
  try {
    console.log('🚀 Starting Appwrite schema deployment...');

    // Read collections schema
    const schemaPath = path.join(__dirname, '../appwrite/schema/collections.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

    // Create database
    const databaseId = process.env.APPWRITE_DATABASE_ID || 'mobile-recharge-db';
    
    try {
      await databases.create(databaseId, 'Mobile Recharge Database');
      console.log('✅ Database created successfully');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Database already exists, continuing...');
      } else {
        throw error;
      }
    }

    // Create collections
    for (const collection of schema.collections) {
      console.log(`📁 Creating collection: ${collection.name}`);
      
      try {
        // Create collection
        await databases.createCollection(
          databaseId,
          collection.id,
          collection.name,
          collection.permissions
        );
        console.log(`✅ Collection ${collection.name} created`);

        // Add attributes
        for (const attribute of collection.attributes) {
          console.log(`  📝 Adding attribute: ${attribute.key}`);
          
          switch (attribute.type) {
            case 'string':
              await databases.createStringAttribute(
                databaseId,
                collection.id,
                attribute.key,
                attribute.size,
                attribute.required,
                attribute.default,
                attribute.array || false
              );
              break;
            case 'integer':
              await databases.createIntegerAttribute(
                databaseId,
                collection.id,
                attribute.key,
                attribute.required,
                attribute.min,
                attribute.max,
                attribute.default,
                attribute.array || false
              );
              break;
            case 'double':
              await databases.createFloatAttribute(
                databaseId,
                collection.id,
                attribute.key,
                attribute.required,
                attribute.min,
                attribute.max,
                attribute.default,
                attribute.array || false
              );
              break;
            case 'boolean':
              await databases.createBooleanAttribute(
                databaseId,
                collection.id,
                attribute.key,
                attribute.required,
                attribute.default,
                attribute.array || false
              );
              break;
            case 'datetime':
              await databases.createDatetimeAttribute(
                databaseId,
                collection.id,
                attribute.key,
                attribute.required,
                attribute.default,
                attribute.array || false
              );
              break;
          }
          
          // Wait a bit to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Create indexes
        for (const index of collection.indexes) {
          console.log(`  🔍 Creating index: ${index.key}`);
          
          await databases.createIndex(
            databaseId,
            collection.id,
            index.key,
            index.type,
            index.attributes,
            index.orders
          );
          
          // Wait a bit to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }

      } catch (error) {
        if (error.code === 409) {
          console.log(`ℹ️  Collection ${collection.name} already exists, skipping...`);
        } else {
          console.error(`❌ Error creating collection ${collection.name}:`, error.message);
        }
      }
    }

    console.log('🎉 Schema deployment completed successfully!');

  } catch (error) {
    console.error('❌ Schema deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploySchema();