import { Router} from "express";
import {addToCart,
    modifyProductQuantity, 
    removeFromCart,
    getAllProductsFromCart } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/add").post(verifyJWT, addToCart)
router.route("/modify").post(verifyJWT, modifyProductQuantity)
router.route("/remove").post(verifyJWT, removeFromCart)

router.route("/getall").get(verifyJWT, getAllProductsFromCart)





export default router