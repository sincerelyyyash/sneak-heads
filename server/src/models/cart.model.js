import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      products: [
        {
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
          }
        }
      ],
      total: {
        type: Number,
        required: true
      }}, {
        timestamps: true
    });




export const Cart = mongoose.model("Cart", cartSchema)