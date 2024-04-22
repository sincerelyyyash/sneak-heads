import { Router} from "express";
import { changePassword, currentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/change-email").post(verifyJWT, updateProfile)

router.route("/user").get(verifyJWT, currentUser)


export default router