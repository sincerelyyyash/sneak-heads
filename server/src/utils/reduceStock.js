import { Product } from "../models/product.model.js";
import { ApiError } from "./apiError.js";

export const reduceStock = async ([orderItems]) =>{
    for (let i=0; i< orderItems.length; i++){
        const element = array[i];

        const order = orderItems[i];
        const product = await Product.findById(order.productId)
        if(!product){
            throw new ApiError(400, "Product not found")
        }

        product.stock -= order.quantity;

        await product.save();
    }
}