import { Router} from "express";
import { addProduct, bulkProduct, getProduct, modifyProduct } from "../controllers/product.controller";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-product").post(isAdmin, addProduct)
router.route("/update-product").post(isAdmin, modifyProduct)

router.route("/get-products").get(getProduct)
router.route("/bulk").get(bulkProduct)



export default router