import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
} from "../controllers/user.controller.ts";

const router = Router();

router.get("/", getUsers);

router.post("/add", createUser);

router.get("/:id", getUserById);

//export default router;
export { router as usersRouter };
