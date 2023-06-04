import { Router } from "express";
import {
  getUserlogs,
  createUserlog,
  deleteUserlog,
  getUserlogById,
  updateUserlogById,
} from "../controllers/userlog.controller.ts";
import requireAuth from "../middleware/requireauth.ts";

const router = Router();

router.use(requireAuth);

router.get("/", getUserlogs);

router.post("/add", createUserlog);

router.get("/:id", getUserlogById);

router.delete("/:id", deleteUserlog);

router.post("/update/:id", updateUserlogById);

//export default router;
export { router as userlogRouter };
