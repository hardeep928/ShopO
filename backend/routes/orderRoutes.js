import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  cancelOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// 🛒 Place order
router.post("/place", authMiddleware, placeOrder);

// 📦 Get my orders
router.get("/", authMiddleware, getUserOrders);

// ❌ Cancel order
router.put("/cancel/:orderId", authMiddleware, cancelOrder);

// Delete Order
router.delete("/delete/:id", authMiddleware, deleteOrder);

export default router;
