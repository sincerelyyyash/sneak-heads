import { Router} from "express";
import { addProduct } from "../controllers/product.controller";

const router = Router();

router.route("/add-product").post(addProduct)



export default router