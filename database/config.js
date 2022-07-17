const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ' + err);
    process.exit(1);
  });
module.exports = mongoose;
