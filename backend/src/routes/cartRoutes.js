import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCartItems);
router.delete("/remove", removeFromCart);

export default router;
