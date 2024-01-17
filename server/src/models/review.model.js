import mongoose, { Schema } from "mongoose";

const reviewSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})


export const Review = mongoose.model("Review", reviewSchema)
