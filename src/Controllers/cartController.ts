import { NextFunction, Request, Response } from "express";
import { Cart } from "../Models/cartModel";

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Cart.create(req.body);

    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const addToCart = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { productId, cartId } = req.params;
  const { name, image, price, quantity, productID } = req.body;

  const doc = await Cart.findById(cartId);

  if (!doc) {
    return res.status(400).json("no cart created");
  }
  const product = doc.product.find((p) => p.productID == productId);

  if (product) {
    return res
      .status(400)
      .json(
        "this product is already in your cart, Increase the quantity from the carts page"
      );
  } else {
    doc.product.push({
      name,
      price,
      quantity,
      image,
      productID,
    });
    await doc.save();
  }

  res.status(200).json({
    status: "success",
    doc,
  });
};

export const deleteFromCart = async (req: Request, res: Response) => {
  const doc = await Cart.findById(req.params.cartId);

  const d = doc!.product.filter((i) => i.id !== req.params.productId);

  doc!.product = [];
  doc!.product = d;
  if (doc!.product.length === 0) {
    doc!.product = [];
  }
  await doc!.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    doc,
  });
};

export const getCart = async (req: any, res: Response) => {
  const id = req.user.id;
  const doc = await Cart.find();
  const cart = doc.find((el) => el.user == id);
  if (!cart) {
    res.status(404).json("not found");
  }
  res.status(200).json(cart);
};

export const updateQuantity = async (req: any, res: Response) => {
  if (req.body.quantity < 1) {
    return res.status(400).json("quantity cannot be smaller than 1");
  }

  const doc = await Cart.updateOne(
    {
      user: req.user.id,
      product: { $elemMatch: { productID: req.params.productId } },
    },
    {
      $set: {
        "product.$.quantity": req.body.quantity,
      },
    }
  ).then((r) => {
    return res.status(200).json(r);
  });
};
