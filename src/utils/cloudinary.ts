import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dzrmunwn7",
  api_key: "671841619634652",
  api_secret: "PoatHbKHXddKBdr_UZCv_-LrRqI",
});

export { cloudinary };
