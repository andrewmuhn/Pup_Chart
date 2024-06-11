const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

const mockUser = {
    name: 'Test',
    email: 'test@test.com',
    password: 'password',
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const setupDb = async () => {
    console.log(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_HOST,
        process.env.DB_PASSWORD,
        'database name')
    const pool = new Pool({
    database: process.env.DB_NAME,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: 5432,
    });

    try {
        const client = await pool.connect();
        return client;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { mockUser, hashPassword, setupDb };