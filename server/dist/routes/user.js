import { Router } from "express";
import { signupUser, loginUser, updateUserByID, } from "../controllers/user.controller.js";
import requireAuth from "../middleware/requireAuth.js";
const router = Router();
// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);
router.use(requireAuth);
// update user
router.put("/update", updateUserByID);
//export default router;
export { router as userRouter };
