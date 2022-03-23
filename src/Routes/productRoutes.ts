import express from "express";
import { addProduct, getAllProducts } from "../Controllers/productcontroller";
import { cartRouter } from "./cartRoutes";

const router = express.Router({ mergeParams: true });
router.use("/:productId/cart/:cartId", cartRouter);

router.post("/create", addProduct);
router.get("/", getAllProducts);

export { router as productRouter };
