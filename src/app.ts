import express from "express";
import { userRouter } from "./Routes/userRoutes";
import { productRouter } from "./Routes/productRoutes";
import multer from "multer";
import fileupload from "express-fileupload";
import { cartRouter } from "./Routes/cartRoutes";
import cors from "cors";
const app = express();
// const app = express()
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// development logging
if (process.env.NODE_ENV === "development") {
  console.log("development");
}

// production logging
if (process.env.NODE_ENV === "production") {
  console.log("production");
}

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

// app.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });

export default app;
