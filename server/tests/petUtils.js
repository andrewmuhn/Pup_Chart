const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const setupDb = async () => {
  try {
    const client = await pool.connect();
    await client.query('DROP TABLE IF EXISTS "pets"');
    await client.query('DROP TABLE IF EXISTS "users"');
    await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          );
        `);

    await client.query(`
          CREATE TABLE IF NOT EXISTS pets (
            id SERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL,
            name VARCHAR(255) NOT NULL,
            breed VARCHAR(255) NOT NULL,
            birthdate DATE NOT NULL,
            profile_picture VARCHAR(255)
          );
        `);

    client.release();
  } catch (err) {
    console.error('Error setting up database:', err);
    throw err;
  }
};

const teardownDb = async () => {
  try {
    const client = await pool.connect();

    // Drop tables in reverse order of dependencies
    await client.query('DROP TABLE IF EXISTS "vaccine"');
    await client.query('DROP TABLE IF EXISTS "daycare_plan"');
    await client.query('DROP TABLE IF EXISTS "medication"');
    await client.query('DROP TABLE IF EXISTS "pets"');
    await client.query('DROP TABLE IF EXISTS "users"');

    client.release();
  } catch (err) {
    console.error('Error tearing down database:', err);
    throw err;
  } finally {
    await pool.end();
  }
};

module.exports = {
  pool,
  setupDb,
  teardownDb,
};
