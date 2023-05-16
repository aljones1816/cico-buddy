import { User } from "../models/user.model";

import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//export default router;
export { router as usersRouter };

// https://youtu.be/7CqJlxBYj-M?t=1562
