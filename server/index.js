const app = require('./server');

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.info(`App listening at http://localhost:${PORT}`);
});
