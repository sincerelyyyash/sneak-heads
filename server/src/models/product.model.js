import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  owner: {
    type: ObjectID,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "Sneaker"
  },
  price: {
    type: Number,
    required: true
  },
  imgURL: [{
    type: String,
    required: true
  }],
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true
    },
    feedback: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
}, {
  timestamps: true
})



export const Product = mongoose.model("Product", productSchema)
