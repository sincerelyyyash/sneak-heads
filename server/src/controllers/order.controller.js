import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod from "zod";
import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/cart.model.js";

const newOrderBody = zod.object({
  shippingInfo: zod.object({
    address: zod.string(),
    city: zod.string(),
    state: zod.string(),
    country: zod.string(),
    pincode: zod.number(),
    status: zod.enum(["Processing", "Shipped", "Delivered"]),
  }),
  user: zod.string(),
  subtotal: zod.number(),
  tax: zod.number(),
  shippingCharge: zod.number(),
  discount: zod.number(),
  total: zod.number(),
  orderItems: zod.array(
    zod.object({
      product: zod.string(),
      quantity: zod.number(),
      subtotal: zod.number(),
    })
  ),
});

const newOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new ApiError(400, "Cart not found");
  }

  const { shippingInfo, subtotal, tax, shippingCharge, discount, total } = req.body;

  const { success, error } = newOrderBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
      error,
    });
  }

  if (!shippingInfo || !subtotal || !tax || !total) {
    throw new ApiError(400, "Please enter all fields");
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
    new ApiResponse(200, "Order created Successfully")
  );
});

export { newOrder };
