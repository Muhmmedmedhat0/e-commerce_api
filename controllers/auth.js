const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// rigister a new user
exports.rigister = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = new User({
    userName: userName,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString(),
  });
  try {
    await user.save();
    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// login a user
exports.login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    // if user not found
    if (!user) {
      return res.status(400).json({ message: 'email is wrong!' });
    }
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    ).toString(CryptoJS.enc.Utf8);

    // if password is wrong
    if (decryptedPassword !== req.body.password) {
      return res.status(422).json({ message: 'wrong password!' });
    }

    // create token if everything is ok
    const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: '3h' }
    );

    // if everything is ok send token and user
    const { password, ...userData } = user._doc;
    res.status(200).json({ ...userData, token });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update a user
