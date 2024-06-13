const userSeed = require('./userSeed.json');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const { readFileSync } = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const schema = readFileSync(
  path.join(__dirname, 'schema.sql'),
  'utf8',
);
const seed = readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

const initDB = async () => {
  try {
    await client.connect();
    await client.query(schema);
    const hashedUsers = await hashPasswords();
    await insertUsers(hashedUsers);
    await client.query(seed);
  } catch (err) {
    console.error(`Error seeding the database: ${err}`);
  } finally {
    await client.end();
  }
};

const hashPasswords = async () => {
  const usersWithHashedPasswords = await Promise.all(
    userSeed.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }),
  );
  return usersWithHashedPasswords;
};

const insertUsers = async (users) => {
  users.forEach(async (user) => {
    await client.query(`INSERT INTO "users"("name", "email", "password")
    VALUES (
        '${user.name}',
        '${user.email}',
        '${user.password}'
    )`);
  });
};

initDB();
