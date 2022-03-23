import express from "express";
import {
  createCart,
  updateQuantity,
  addToCart,
  getCart,
} from "../Controllers/cartController";
import { protect } from "../Controllers/userController";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.patch("/", updateQuantity);

router.route("/create").post(createCart);
router.post("/", addToCart);

router.route("/myCart").get(getCart);

export { router as cartRouter };
