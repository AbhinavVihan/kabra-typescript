import express from "express";
import {
  singup,
  login,
  protect,
  getMe,
  getUser,
} from "../Controllers/userController";
const router = express.Router();

router.route("/signup").post(singup);
router.route("/login").post(login);
router.get("/me", protect, getMe, getUser);
export { router as userRouter };
