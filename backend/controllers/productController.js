const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Create Product (Admin Only)
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, image } = req.body;

  if (!title || !description || !price) {
    res.status(400);
    throw new Error("Title, description, and price are required.");
  }

  const newProduct = new Product({
    title,
    description,
    price,
    image,
  });

  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
});

// Edit Product (Admin Only)
const editProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.status(200).json(updatedProduct);
});

// Delete Product (Admin Only)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully." });
});

// Purchase Product
const purchaseProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  product.purchases += 1;
  await product.save();

  res.status(200).json({ message: "Product purchased successfully." });
});

// Rate Product
const rateProduct = asyncHandler(async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5.");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const totalRating = product.ratings.average * product.ratings.count;
  product.ratings.count += 1;
  product.ratings.average = (totalRating + rating) / product.ratings.count;

  await product.save();

  res.status(200).json({
    message: "Product rated successfully.",
    ratings: product.ratings,
  });
});

// Get Best Sellers
const getBestSellers = asyncHandler(async (req, res) => {
  const products = await Product.find({ purchases: { $gt: 0 } })
    .sort({ purchases: -1 })
    .limit(10);

  res.status(200).json(products);
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  purchaseProduct,
  rateProduct,
  getBestSellers,
  getAllProducts,
};
