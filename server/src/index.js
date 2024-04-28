import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/index.js"
import { app } from "./app.js";
import Stripe from "stripe";

dotenv.config({
  path: './env'
})


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  })


  export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    apiVersion: "2022-11-15",
  })