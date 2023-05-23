import { User, IUser } from "../models/user.model.ts";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

const createToken = (_id: string) => {
  return jsonwebtoken.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });
};

// login user
const loginUser = async (req: Request, res: Response) => {
  const [email, password] = [req.body.email, req.body.password];
  try {
    const user = await (
      User as typeof User & {
        login: (email: string, password: string) => Promise<IUser>;
      }
    ).login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// logout user
//const logoutUser = async (req: Request, res: Response) => {};

// signup user
const signupUser = async (req: Request, res: Response) => {
  const [email, password] = [req.body.email, req.body.password];
  try {
    const user = await (
      User as typeof User & {
        signup: (email: string, password: string) => Promise<IUser>;
      }
    ).signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};
//export default controller;
export { signupUser, loginUser };
