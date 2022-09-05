const Order = require('../models/Order');

// create a new Order
exports.create = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const orders = await newOrder.save();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update a Order
exports.orderUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete Order
exports.orderDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get user orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get all Orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// get monthly income
exports.getIncome = async (req, res, next) => {
  const productId = req.query.id;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // aggregate function to get monthly income
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
