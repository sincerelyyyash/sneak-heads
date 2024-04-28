import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod from "zod";
import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";
import Stripe from 'stripe';
import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const newOrderBody = zod.object({
    shippingInfo: zod.object({
      address: zod.string(),
      city: zod.string(),
      state: zod.string(),
      country: zod.string(),
      pincode: zod.number(),
      status: zod.enum(["Processing", "Shipped", "Delivered", "Cancelled"]),
    }),
    subtotal: zod.number(),
    tax: zod.number(),
    shippingCharge: zod.number(),
    discount: zod.number(),
    total: zod.number(),
  });

  const cancelOrderBody = zod.object({
    orderId: zod.string(),
  });
  
  

  const newOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let cart = await Cart.findOne({ owner: userId });
  
    if (!cart) {
      throw new ApiError(400, "Cart not found");
    }

    if (cart.products.length === 0) {
      return res.status(400).json(
        new ApiResponse(400, "Cart is empty")
      );
    }

    const { shippingInfo, subtotal, tax, shippingCharge, discount, total } = req.body;
  
    const { success, error } = newOrderBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json(
        new ApiResponse(400, "Invalid Inputs", error)
      );
    }
  
    if (!shippingInfo || !subtotal || !tax || !total) {
      throw new ApiError(400, "Please provide all required fields");
    }

    const orderItems = cart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      user: userId,
      subtotal,
      tax,
      shippingCharge,
      discount,
      total,
    });
  
    if (order) {
      cart.products = [];
      await cart.save();
    }

    return res.status(201).json(
      new ApiResponse(200, "Order created successfully", { order })
    );
  });
  
  const stripeCheckout = asyncHandler(async(req, res)=>{
    const userId = req.user._id;

    let cart = await Cart.findOne({owner: userId});

    if(!cart){
      throw new ApiError(400, "Cart not found");
    }
    
    if (cart.products.length === 0){
      console.log("error1")
      return res.status(400).json(
        new ApiResponse(400, "Cart is empty")
      );
    }

    const {shippingInfo, lineItems} = req.body;

    if (!shippingInfo) {
      console.log("error2")
      throw new ApiError(400, "Please provide all required fields");
    }

    const orderItems = cart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    const subtotal = cart.total;
    const tax = 0;
    const shippingCharge = 0;
    const discount = 0;
    const total = cart.total;

    try {

      const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/",
        cancel_url:"http://localhost:5173/",
    })
    
    const order = await Order.create({
      shippingInfo,
      orderItems,
      user: userId,
      subtotal,
      tax,
      shippingCharge,
      discount,
      total,
    });

    if (order) {
      cart.products = [];
      await cart.save();
    }
    return res.status(200).json(
      new ApiResponse(200, "Order created successfully", {id: session.id})
    );
    } catch (error) {
      console.error("Error during order creation:", error);
      res.status(200).json(
        new ApiError(400, "Order creation failed")
      )
    }
  })

  const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const { success, error } = cancelOrderBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json(
        new ApiResponse(400, "Invalid Inputs", error)
      );
    }
  
    const { orderId } = req.body;
  
    if (!userId || !orderId) {
      throw new ApiError(400, "User ID and Order ID are required");
    }
  
    const order = await Order.findOne({ _id: orderId, user: userId }).populate('orderItems.product');
  
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
  
    order.shippingInfo.status = "Cancelled";
  
    await order.save();
  
    return res.status(200).json(
      new ApiResponse(200, "Order cancelled successfully")
    );
  });

  const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
    const orders = await Order.find({ user: userId});
  

    if (!orders || orders.length === 0) {
      throw new ApiError(404, "No orders found");
    }

    return res.status(200).json(
      new ApiResponse(200, "Orders retrieved successfully", { orders })
    );
  });
  
  
  

export { newOrder, cancelOrder, getAllOrders, stripeCheckout };
