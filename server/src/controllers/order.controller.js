
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import zod from "zod";
import { Order } from "../models/order.model";
import {ApiResponse} from "../utils/apiResponse.js"


const newOrderBody = zod.object({
    shippingInfo : {
        address: zod.string(),
        city: zod.string(),
        state: zod.string(),
        country: zod.string(),
        pincode: zod.number(),
        status: zod.enum()
    },
    user: zod.string(),
    subtotal: zod.number(),
    tax: zod.number(),
    shippingCharges: zod.number(),
    discount: zod.number(),
    total: zod.string(),
    orderItems: {
        name: zod.string(),
        photo: zod.string(),
        price: zod.number(),
        quantity: zod.number(),
        productId: zod.string(),
    }
})

const newOrder = asyncHandler(async(req, res)=>{

    const {shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharge,
        discount,
        total,} = req.body;

        const { success } = newOrderBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message: "Invalid Inputs"
            })
        }

        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total){
            throw new ApiError(400, "Please enter all fields")
        }

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharge,
            discount,
            total,
        });


        return res.status(201).json(
            new ApiResponse(200, "Order created Successfully")
        )
    
    
    })


    export { newOrder}