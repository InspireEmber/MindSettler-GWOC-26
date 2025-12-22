const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const connectDB = require('../src/config/db');
const Admin = require('../src/models/Admin');

async function seedAdmin() {
  try {
    await connectDB();

    const username = process.env.SEED_ADMIN_USERNAME || 'admin';
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@mindsettler.local';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin user '${username}' already exists.`);
      process.exit(0);
    }

    // passport-local-mongoose helper
    await Admin.register({ username, email }, password);

    console.log('Default admin created:');
    console.log(`  username: ${username}`);
    console.log(`  email:    ${email}`);
    console.log(`  password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
}

seedAdmin();
