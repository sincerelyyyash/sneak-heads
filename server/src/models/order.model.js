import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing"
        }
    },
    orderItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        subtotal: {
            type: Number,
            required: true
        },
        size:{
            type: Number,
            required: true,
            default: 6
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shippingCharge: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
