import { Router} from "express";
import {addToCart,
    modifyProductQuantity, 
    removeFromCart,
    getAllProductsFromCart } from "../controllers/cart.controller.js"



const router = Router();

router.route("/add/:productId").post(addToCart)
router.route("/modify/:productId").post(modifyProductQuantity)
router.route("/remove/:productId").post(removeFromCart)

router.route("/getall").post(getAllProductsFromCart)





export default router