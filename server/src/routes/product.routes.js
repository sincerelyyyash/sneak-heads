import { Router} from "express";
import { addProduct, bulkProduct, getAllProducts, getProduct, modifyProduct } from "../controllers/product.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/add-product").post(verifyJWT, isAdmin,
    upload.fields([{
        name: "productImages",
        maxCount: 4
    }]),
    addProduct)

router.route("/update-product").post(isAdmin,
    upload.fields([{
        name: "productImages",
        maxCount: 4
    }]),
    modifyProduct)

router.route("/allproducts").get(getAllProducts)
router.route("/get-products").get(getProduct)
router.route("/bulk").get(bulkProduct)



export default router