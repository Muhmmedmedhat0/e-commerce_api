require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
require('./database/config');
const app = express();
const userRouter = require('./routes/user_route');
const authRouter = require('./routes/auth_route');

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
