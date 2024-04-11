import {Cart} from '../models/cart.model.js'
import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'



const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; 

  let cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    cart = new Cart({ owner: userId, products: [] });
  }

  const existingProductIndex = cart.products.findIndex(
    (item) => String(item.product) === productId
  );

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity, subtotal: product.price * quantity });
  }

  cart.total = cart.products.reduce((acc, product) => acc + product.subtotal, 0);

  await cart.save();

  res.status(200).json(new ApiResponse(200, null, 'Product added to cart successfully'));
});

const modifyProductQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; 

  let cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  const productIndex = cart.products.findIndex((item) => String(item.product) === productId);

  if (productIndex === -1) {
    throw new ApiError(404, 'Product not found in cart');
  }

  if (quantity === 0) {
    cart.products.splice(productIndex, 1);
  } else {
    cart.products[productIndex].quantity = quantity;
  }

  cart.total = cart.products.reduce((acc, product) => acc + product.subtotal, 0);

  await cart.save();

  res.status(200).json(new ApiResponse(200, null, 'Product quantity modified successfully'));
});


const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id; 

  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  cart.products = cart.products.filter((item) => String(item.product)!== productId);

  cart.total = cart.products.reduce((acc, product) => acc + product.subtotal, 0);

  await cart.save();

  res.status(200).json(new ApiResponse(200, null, 'Product removed from cart successfully'));
});

const getAllProductsFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; 

  const cart = await Cart.findOne({ owner: userId }).populate('products.product');

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  res.status(200).json(new ApiResponse(200, cart.products, 'Products retrieved successfully'));
});

export {
  addToCart,
  modifyProductQuantity, 
  removeFromCart,
  getAllProductsFromCart
};
