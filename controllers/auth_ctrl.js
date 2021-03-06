const User = require('../models/user_model');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async (req, res, next) => {
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
  },
  login: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email: email });
      // if user not found
      !user && res.status(401).json({ message: 'User not found' });
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_KEY
      ).toString(CryptoJS.enc.Utf8);

      // if password is wrong
      decryptedPassword !== req.body.password &&
        res.status(401).json({ message: 'Wrong password' });

      // create token if everything is ok
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY,
        { expiresIn: '3d' }
      );

      // if everything is ok
      const { password, ...userData } = user._doc;
      res.status(200).json({ ...userData, token });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = authCtrl;
