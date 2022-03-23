import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface ICart {
  product: {
    id?: string;
    price: number;
    quantity: number;
    image: string;
    name: string;
    productID: string;
  }[];
  user: { type: mongoose.Schema.Types.ObjectId };
}

const cartSchema = new Schema<ICart>(
  {
    product: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        productID: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "cart must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = model("Cart", cartSchema);

export { Cart };
