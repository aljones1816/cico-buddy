import { User } from "../models/user.model.ts";
import { Request, Response } from "express";
import Mongoose from "mongoose";

// get all users
const getUsers = async (req: Request, res: Response) => {
  console.log(req);
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// create new user
const createUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  try {
    const newUser = await User.create({ username });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// get a user by id
const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No id provided");
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("Userlog not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

//export default controller;
export { getUsers, createUser, getUserById };
