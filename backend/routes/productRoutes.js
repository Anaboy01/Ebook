const express = require("express");
const { protect, adminProtect } = require("../middleware/authMiddleware");
const ebookController = require("../controllers/productController");

const router = express.Router();

router.post("/create", protect, adminProtect, ebookController.createEbook);
router.put("/:id", protect, adminProtect, ebookController.updateEbook);
router.delete("/:id", protect, adminProtect, ebookController.deleteEbook);
router.get("/", ebookController.getAllEbooks);
router.get("/best-sellers", ebookController.getBestSellers);
router.get("/in-stock", ebookController.getInStockEbooks);

module.exports = router;
