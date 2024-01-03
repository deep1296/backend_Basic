import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authorization } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avtar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

// secured routes

router.route("/logout").post(authorization, logOutUser);

export default router;
