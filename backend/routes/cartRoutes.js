import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add product to cart
router.post("/add", authMiddleware, addToCart);

// 📦 Get logged-in user's cart
router.get("/", authMiddleware, getUserCart);

// 🔄 Update product quantity
router.put("/update", authMiddleware, updateCartQuantity);

// ➖ Remove product from cart
router.delete("/remove/:productId", authMiddleware, removeFromCart);

// 🧹 Clear entire cart (optional but useful)
router.delete("/clear", authMiddleware, clearCart);

export default router;
