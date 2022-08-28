require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
require('./database/config');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const paymenttRouter = require('./routes/stripe');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymenttRouter);

// error handling middleware - must be last in the chain of middleware (after all other middleware)
app.use((err, req, res, next) => {
  console.log(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server err';
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
