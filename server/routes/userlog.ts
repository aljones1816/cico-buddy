import { Userlog } from "../models/userlog.model.ts";
import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  console.log(req);
  Userlog.find()
    .then((userlogs) => res.json(userlogs))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const breakfast = Number(req.body.breakfast);
  const lunch = Number(req.body.lunch);
  const dinner = Number(req.body.dinner);
  const snacks = Number(req.body.snacks);
  const exercise = Number(req.body.exercise);
  const bodyweight = Number(req.body.bodyweight);
  const date = Date.parse(req.body.date);

  const newUserlog = new Userlog({
    username,
    breakfast,
    lunch,
    dinner,
    snacks,
    exercise,
    bodyweight,
    date,
  });

  newUserlog
    .save()
    .then(() => res.json("Userlog added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Userlog.findById(req.params.id)
    .then((userlog) => res.json(userlog))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Userlog.findByIdAndDelete(req.params.id)
    .then(() => res.json("Userlog deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Userlog.findById(req.params.id)
    .then((userlog) => {
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

      userlog
        .save()
        .then(() => res.json("Userlog updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//export default router;
export { router as userlogRouter };
