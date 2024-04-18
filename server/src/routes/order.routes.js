import { Router} from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { cancelOrder, newOrder } from "../controllers/order.controller.js";


const router = Router();


router.route("/new-order").post(verifyJWT ,newOrder)
router.route("/cancel-order").post(verifyJWT ,cancelOrder)



export default router