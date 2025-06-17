const asyncHandler = require("express-async-handler");
const Ebook = require("../models/ebookModel");

// Create Ebook (Admin Only)
const createEbook = asyncHandler(async (req, res) => {
  const { id, name, overview, long_description, price, poster, size, best_seller, in_stock, rating } = req.body;

  if (!id || !name || !price) {
    res.status(400);
    throw new Error("ID, name, and price are required.");
  }

  // Only admin can set rating
  const ebookData = {
    id,
    name,
    overview,
    long_description,
    price,
    poster,
    size,
    best_seller,
    in_stock,
  };

  if (req.user.isAdmin) {
    ebookData.rating = rating || 0;
  }

  const newEbook = new Ebook(ebookData);
  const savedEbook = await newEbook.save();
  res.status(201).json(savedEbook);
});

// Update Ebook (Admin Only)
const updateEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);
  if (!ebook) {
    res.status(404);
    throw new Error("Ebook not found.");
  }

  // Only admin can update rating
  if (!req.user.isAdmin && req.body.rating !== undefined) {
    res.status(403);
    throw new Error("Not authorized to update rating.");
  }

  const updatedEbook = await Ebook.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedEbook);
});

// Delete Ebook (Admin Only)
const deleteEbook = asyncHandler(async (req, res) => {
  const ebook = await Ebook.findById(req.params.id);
  if (!ebook) {
    res.status(404);
    throw new Error("Ebook not found.");
  }

  await ebook.deleteOne();
  res.status(200).json({ message: "Ebook deleted successfully." });
});

// Get All Ebooks
const getAllEbooks = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find();
  res.status(200).json(ebooks);
});

// Get Best Sellers
const getBestSellers = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find({ best_seller: true }).sort({ rating: -1 });
  res.status(200).json(ebooks);
});

// Get Instock
const getInStockEbooks = asyncHandler(async (req, res) => {
  const ebooks = await Ebook.find({ in_stock: true });
  res.status(200).json(ebooks);
});


module.exports = {
  createEbook,
  updateEbook,
  deleteEbook,
  getAllEbooks,
  getBestSellers,
  getInStockEbooks
};
