import express from "express";
import {
  register,
  login,
  deleteUser,
  updateEmail,
  updatePassword,
  updateUsername,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-email", authMiddleware, updateEmail);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-username", authMiddleware, updateUsername);
router.delete("/delete", authMiddleware, deleteUser);

export default router;
