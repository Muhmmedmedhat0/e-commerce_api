const Cart = require('../models/Cart');

// create a new cart
exports.create = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json({ savedCart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update a Cart
exports.CartUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ user: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete Cart
exports.cartDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Cart deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get user Cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get all Carts
exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
