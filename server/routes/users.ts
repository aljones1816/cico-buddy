import { User } from "../models/user.model.ts";

import { Router } from "express";

const router = Router();

router.route("/users").get((req, res) => {
  console.log(req);
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/users/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//export default router;
export { router as usersRouter };

// https://youtu.be/7CqJlxBYj-M?t=1562
