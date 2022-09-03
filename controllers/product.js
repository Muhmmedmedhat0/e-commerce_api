const Product = require('../models/Product');

// create a new product
exports.create = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const product = await newProduct.save();
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update a product
exports.productUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ user: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete product
exports.ProductDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(`${deletedProduct.title} deleted sucss`);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get product by id
exports.getProdctt = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get all products
exports.productGetAll = async (req, res, next) => {
  const newProduct = req.query.new;
  const category = req.query.category;
  try {
    let products;
    // get new products that last added
    if (newProduct) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (category) {
      // get products by category
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      // get all products
      products = await Product.find();
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
