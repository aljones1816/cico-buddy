import { Userlog } from "../models/userlog.model.ts";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log(req);

  try {
    const userlogs = await Userlog.find();
    res.status(200).json(userlogs);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/add", async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
  try {
    const userlog = await Userlog.findById(req.params.id);
    res.status(200).json(userlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userlog = await Userlog.findByIdAndDelete(req.params.id);
    res.status(200).json(userlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const userlog = await Userlog.findById(req.params.id);
    if (!userlog) {
      return res.status(404).send("Userlog not found");
    }
    userlog.username = req.body.username;
    userlog.breakfast = Number(req.body.breakfast);
    userlog.lunch = Number(req.body.lunch);
    userlog.dinner = Number(req.body.dinner);
    userlog.snacks = Number(req.body.snacks);
    userlog.exercise = Number(req.body.exercise);
    userlog.bodyweight = Number(req.body.bodyweight);
    userlog.date = new Date(Date.parse(req.body.date));
    const updatedUserlog = await userlog.save();
    res.status(200).json(updatedUserlog);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

//export default router;
export { router as userlogRouter };
