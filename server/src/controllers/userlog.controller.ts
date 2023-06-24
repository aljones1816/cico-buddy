import { Userlog } from "../models/userlog.model.js";
import { Request, Response } from "express";
import Mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/requireAuth.js";

// get all userlogs
const getUserlogs = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user;
  try {
    const userlogs = await Userlog.find({ user_id });
    res.status(200).json(userlogs);
  } catch (err) {
    res.status(400).json(`Oh man big time Error: ${err}`);
  }
};

// create new userlog
const createUserlog = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user;
  const email = req.body.email;
  const breakfast = req.body.breakfast ? req.body.breakfast : 0;
  const lunch = req.body.lunch ? req.body.lunch : 0;
  const dinner = req.body.dinner ? req.body.dinner : 0;
  const snacks = req.body.snacks ? req.body.snacks : 0;
  const exercise = req.body.exercise ? req.body.exercise : 0;
  const bodyweight = req.body.bodyweight ? req.body.bodyweight : 0;
  try {
    const newUserlog = await Userlog.create({
      user_id,
      email,
      breakfast,
      lunch,
      dinner,
      snacks,
      exercise,
      bodyweight,
    });
    res.status(200).json(newUserlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// delete userlog
const deleteUserlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No id provided");
  }
  try {
    const userlog = await Userlog.findByIdAndDelete(id);
    if (!userlog) {
      return res.status(404).send("Userlog not found");
    }
    res.status(200).json(userlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// get userlog by id
const getUserlogById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No id provided");
  }

  try {
    const userlog = await Userlog.findById(id);
    if (!userlog) {
      return res.status(404).send("Userlog not found");
    }
    res.status(200).json(userlog);
  } catch (err) {
    res.status(400).json(`{Error: ${err}}`);
  }
};

// update userlog by id
const updateUserlogById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No id provided");
  }

  try {
    const userlog = await Userlog.findByIdAndUpdate(id, { ...req.body });
    if (!userlog) {
      return res.status(404).send("Userlog not found");
    }

    res.status(200).json(userlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

//export default controller;
export {
  getUserlogs,
  createUserlog,
  deleteUserlog,
  getUserlogById,
  updateUserlogById,
};
