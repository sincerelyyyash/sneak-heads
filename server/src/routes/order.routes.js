import { Router} from "express";
import { isAdmin } from "../middlewares/auth.middleware.js";
import { newOrder } from "../controllers/order.controller.js";


const router = Router();


router.route("/new-order").post(newOrder)



export default router