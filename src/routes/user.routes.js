import { Router } from "express";
import {
  changeAvatar,
  getCurrentUser,
  logOutUser,
  loginUser,
  regenerateAccessToken,
  registerUser,
  updatePassword,
  updateUserDetails,
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
router.route("/regenerateTokens").get(regenerateAccessToken);
router.route("/resetPassword").post(authorization, updatePassword);
router.route("/getUser").get(authorization, getCurrentUser);
router.route("/updateDetails").post(authorization, updateUserDetails);
router.route("/changeAvtar").post(authorization, changeAvatar);

export default router;
