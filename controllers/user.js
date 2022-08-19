const User = require('../models/User');

exports.userUpdate = async (req, res, next) => {
  //  check the password
  const { password } = req.body;
  const { id } = req.params;
  if (password) {
    const decryptedPassword = CryptoJS.AES.decrypt(
      User.password,
      process.env.PASS_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      res.status(401).json({ message: 'Wrong password' });
    }
  }
  // update the user
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete user
exports.userDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(`User ${deletedUser.userName} deleted`);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// get all users
exports.userGetAll = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// get user status to create admin chart in dashboard
exports.userStatus = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.getFullYear() - 1);
  try {
    const users = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      { $group: { _id: '$month', total: { $sum: 1 } } },
    ]);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
