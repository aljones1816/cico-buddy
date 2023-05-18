import { User } from "../models/user.model.ts";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log(req);
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

router.post("/add", async (req, res) => {
  const username = req.body.username;
  try {
    const newUser = await User.create({ username });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

//export default router;
export { router as usersRouter };
