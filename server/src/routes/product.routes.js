import { Router} from "express";
import { addProduct, bulkProduct, getProduct, modifyProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/add-product").post(isAdmin,
    upload.fields([{
        name: "productBanner",
        maxCount: 1
    }]),
    addProduct)
router.route("/update-product").post(isAdmin,
    upload.fields([{
        name: "productBanner",
        maxCount: 1
    }]),
    modifyProduct)

router.route("/get-products").get(getProduct)
router.route("/bulk").get(bulkProduct)



export default router