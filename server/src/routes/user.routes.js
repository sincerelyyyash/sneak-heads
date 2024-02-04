import { Router} from "express";
import { changePassword, currentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(changePassword)
router.route("/change-email").post(updateProfile)

router.route("/user").get(currentUser)


export default router