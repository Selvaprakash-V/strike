import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from '../src/data/products.js';
import process from 'node:process';

// Load variables from .env
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ ERRROR: Missing Supabase environment variables!\n');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

// ⚠️ We use the SERVICE_ROLE_KEY here to bypass Row Level Security (RLS) entirely while seeding.
// THIS KEY MUST NEVER BE EXPOSED TO THE FRONTEND
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function validateConnection() {
  console.log('🔄 Testing connection to Supabase...');
  try {
    // Ping to see if the table responds (error 42P01 means table doesn't exist, which is fine if we're creating it)
    const { error } = await supabase.from('products').select('*').limit(1);
    if (error && error.code !== '42P01') {
      throw new Error(error.message);
    }
    console.log('✅ Connection validated successfully!\n');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
}

async function seed() {
  await validateConnection();

  console.log('🌱 Starting the seeding process...');

  const results = {
    success: 0,
    errors: 0
  };

  // We loop independently to handle individual errors without breaking the batch 
  // (Alternatively: bulk insert, but mapping handles reference integrity & custom error reporting better)
  for (const product of products) {
    try {
      const { id, name, category, price, rating, image, description } = product;

      // Upsert (Update if exists, Insert if doesn't) to maintain referential integrity & avoid duplicate IDs
      const { error } = await supabase
        .from('products')
        .upsert(
          { id, name, category, price, rating, image, description },
          { onConflict: 'id' } 
        );

      if (error) {
        console.error(`❌ Failed to seed product #${id} (${name}):`, error.message);
        results.errors++;
      } else {
        console.log(`✔️  Successfully synced: ${name}`);
        results.success++;
      }
    } catch (err) {
      console.error(`❌ Unexpected Error on product #${product.id}:`, err.message);
      results.errors++;
    }
  }

  console.log('\n📊 Seeding Complete!');
  console.log(`➡️  Successful Inserts/Updates: ${results.success}`);
  console.log(`➡️  Failed items: ${results.errors}`);
  
  if (results.errors > 0) {
    console.warn('\n⚠️ Review the errors above to ensure complete database integrity.');
    process.exit(1);
  } else {
    console.log('🎉 Data successfully synced and ready for deployment!');
    process.exit(0);
  }
}

// Execute the seed runner
seed();
