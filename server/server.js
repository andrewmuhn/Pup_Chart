const express = require('express');
const routes = require('./controllers');
const path = require('path');
const cors = require('cors');

const app = express();

// Permit cross-origin requests
app.use(cors());
// Support application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// Support application/json data
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

module.exports = app;