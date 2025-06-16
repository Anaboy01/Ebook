const express = require("express");
const router = express.Router();
const {
  createProduct,
  editProduct,
  deleteProduct,
  purchaseProduct,
  rateProduct,
  getBestSellers,
  getAllProducts
} = require("../controllers/productController");

const { adminProtect, protect } = require("../middleware/authMiddleware");

router.get("/best-sellers", getBestSellers);
router.post("/:id/purchase", protect, purchaseProduct);
router.post("/:id/rate", protect, rateProduct);

router.post("/create", adminProtect, createProduct);
router.put("/:id/edit", adminProtect, editProduct);
router.delete("/:id", adminProtect, deleteProduct);
router.get('/', getAllProducts);

module.exports = router;