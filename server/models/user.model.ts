import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hash: true,
  },
});

userSchema.statics.signup = async function (
  this: Model<IUser>,
  email: string,
  password: string
) {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const UserModel = this;
  const emailExists = await UserModel.findOne({ email });

  if (emailExists) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
  });

  return newUser;
};

// static login method
userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export { User, type IUser };
