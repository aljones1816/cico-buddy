import { Userlog } from "../models/userlog.model.ts";
import { Request, Response } from "express";
import Mongoose from "mongoose";

// get all userlogs
const getUserlogs = async (req: Request, res: Response) => {
  console.log(req);
  try {
    const userlogs = await Userlog.find();
    // check if userlogs contains a log for today's date
    // if not, create one
    const today = new Date();
    const todayString = today.toDateString();
    const todayLog = userlogs.find((log) => {
      return log.date.toDateString() === todayString;
    });
    if (!todayLog) {
      const newTodayLog = await Userlog.create({
        username: "test",
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snacks: 0,
        exercise: 0,
        bodyweight: 0,
      });
      userlogs.push(newTodayLog);
    }
    res.status(200).json(userlogs);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

// create new userlog
const createUserlog = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json("No request body");
  }

  const username = req.body.username;
  const breakfast = Number(req.body.breakfast);
  const lunch = Number(req.body.lunch);
  const dinner = Number(req.body.dinner);
  const snacks = Number(req.body.snacks);
  const exercise = Number(req.body.exercise);
  const bodyweight = Number(req.body.bodyweight);
  const date = Date.parse(req.body.date);

  try {
    const newUserlog = await Userlog.create({
      username,
      breakfast,
      lunch,
      dinner,
      snacks,
      exercise,
      bodyweight,
      date,
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
    res.status(400).json(`Error: ${err}`);
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
