import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  userName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export const correctPassword = async function (
  candidatePassword: any,
  userPassword: any
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model("User", userSchema);

export { User };
