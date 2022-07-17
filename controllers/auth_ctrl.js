const User = require('../models/user_model');
const authCtrl = {
  register: async (req, res, next) => {
    const { userName, email, password } = req.body;
    const user = new User({
      userName: userName,
      email: email,
      password: password,
    });
    try {
      await user.save();
      res
        .status(201)
        .json({ message: `User ${userName} created successfully` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  login: async (req, res, next) => {
    try {
      res.send('hello world');
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authCtrl;
