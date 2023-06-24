import { Router } from "express";
import {
  getUserlogs,
  createUserlog,
  deleteUserlog,
  getUserlogById,
  updateUserlogById,
} from "../controllers/userlog.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// require auth for all routes
router.use(requireAuth);

router.get("/", getUserlogs);

router.post("/add", createUserlog);

router.get("/:id", getUserlogById);

router.delete("/:id", deleteUserlog);

router.post("/update/:id", updateUserlogById);

//export default router;
export { router as userlogRouter };
