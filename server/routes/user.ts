import { Router } from "express";
import { signupUser, loginUser } from "../controllers/user.controller.ts";

const router = Router();

// login route
router.post("/login", loginUser);

// logout route
//router.post("/logout", logoutUser);

// signup route
router.post("/signup", signupUser);

//export default router;
export { router as userRouter };
