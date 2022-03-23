import { correctPassword, User } from "../Models/userModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

const signToken = (id: string) =>
  jwt.sign({ id }, "hello-there", {
    expiresIn: "90d",
  });

const createSendToken = (doc: any, statusCode: number, req: any, res: any) => {
  const token = signToken(doc._id);

  doc.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    doc,
  });
};

export const singup = async function (req: Request, res: Response) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "You must fill in all the fields" });
    }
    const newUser = await User.create({
      userName,
      password,
    });

    createSendToken(newUser, 200, req, res);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const login = async function (req: any, res: any) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(500).json({
      message: "You must provide username and password",
    });
  }

  const user = await User.findOne({ userName }).select("+password");
  if (!user || !(await correctPassword(password, user.password))) {
    return res.status(400).json({
      message: "Incorrect username or password",
    });
  }

  createSendToken(user, 200, req, res);
};

export const protect = async (req: any, res: any, next: NextFunction) => {
  // 1) getting token and check if its there
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in.Please login to get Access",
    });
  }

  // 2) Verification token
  const decoded: any = jwt.verify(token, "hello-there");

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res
      .status(400)
      .json("the user belonging to this token does no longer exists");
  }

  // grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

export const getMe = (req: any, res: any, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};

export const getUser = async (req: any, res: any) => {
  let query = User.findById(req.params.id);
  const doc = await query;

  res.status(200).json({
    status: "success",
    doc,
  });
};

interface UserResponse {
  userName: string;
  _id: string;
  password?: string;
}
