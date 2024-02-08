import mongoose from "mongoose";
import { number } from "zod";

const schema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required:true
        },
        country: {
            type: String,
            required: true,
        },
        pincode:{
            type: Number,
            required: true
        },
        tax:{
            type: Number,
            required: true
        },
        shippingCharge:{
            type: Number,
            required: true
        },
        discount:{
            type: Number,
            required: true
        },
        total:{
            type: Number,
            required: true
        },
        status:{
            enum: ["Processing", "Shipped", "Delivered"],
            default: "Processing"
        },
        orderItems:[{
            name: String,
            photo: String,
            price: Number,
            quanity: Number,
            productID: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        }]

    },
    user:{
        type: String,
        ref: "User",
        required: true,
    },
    subtotal:{
        type: number,
        required: true,
    }
},{timestamps: true})