import { Router} from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { cancelOrder, getAllOrders, newOrder, stripeCheckout } from "../controllers/order.controller.js";


const router = Router();


router.route("/new-order").post(verifyJWT ,newOrder)
router.route("/cancel-order").post(verifyJWT ,cancelOrder)

router.route("/all-orders").get(verifyJWT ,getAllOrders)

router.route("/create-checkout-session").post(verifyJWT, stripeCheckout)

export default router