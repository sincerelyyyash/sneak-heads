import { Router} from "express";
import { addProduct, bulkProduct, getProduct, modifyProduct } from "../controllers/product.controller";

const router = Router();

router.route("/add-product").post(addProduct)
router.route("/update-product").post(modifyProduct)

router.route("/get-products").get(getProduct)
router.route("/bulk").get(bulkProduct)



export default router