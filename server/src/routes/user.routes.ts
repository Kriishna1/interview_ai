import { Router } from "express";
import {
  registerUser,
  loginUser,
  editUser,
  logOutUser,
  getUser,
} from "../controllers/user.controllers";
import { asyncHandler } from "../utils/asyncHandler";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Signup route
router.route("/register").post(asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));
router.get(
  "/getuserdetails",
  asyncHandler(authMiddleware),
  asyncHandler(getUser)
);

router.post("/logout", asyncHandler(logOutUser));

router.put("/edit", asyncHandler(authMiddleware), asyncHandler(editUser));

export default router;
