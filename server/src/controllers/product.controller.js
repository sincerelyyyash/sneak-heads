import {Product} from '../models/product.model.js'
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadCloudinary } from '../utils/cloudinary.js';


const addProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, stock } = req.body;
    const imgURLs = req.files?.productImages?.map((file) => file.path);

  
    if (
      [name, description, category, price, stock].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    if (!imgURLs || imgURLs.length === 0) {
      throw new ApiError(400, "Product images required.");
    }
  
    const uploadedImages = await Promise.all(
      imgURLs.map(async (imageUrl) => {
        return await uploadCloudinary(imageUrl);
      })
    );
  
    if (uploadedImages.some((image) => !image)) {
      throw new ApiError(400, "Error uploading product images.");
    }
  
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock, 
      owner: req.user._id, 
      imgURLs: uploadedImages.map((image) => image.url),
    });
  
    if (!product) {
      throw new ApiError(500, "Something went wrong while adding product");
    }
  
    return res.status(201).json(
      new ApiResponse(200, "Product added successfully")
    );
  });
  


  const modifyProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, stock } = req.body;
    const imgURLs = req.files?.productImages?.map((file) => file.path);
  
  
    if (!imgURLs || imgURLs.length === 0) {
      throw new ApiError(400, "Product images required.");
    }
  
    const uploadedImages = await Promise.all(
      imgURLs.map(async (imageUrl) => {
        return await uploadCloudinary(imageUrl);
      })
    );
  
    if (uploadedImages.some((image) => !image)) {
      throw new ApiError(400, "Error uploading product images.");
    }
  
    const updatedProduct = await Product.findByIdAndUpdate(
      req.product?._id,
      {
        $set: {
          name: name,
          description: description,
          category: category,
          price: price,
          stock: stock, 
          owner: req.user._id, 
          imgURLs: uploadedImages.map((image) => image.url),
        },
      },
    );
  
    if (!updatedProduct) {
      throw new ApiError(500, "Something went wrong while modifying product");
    }
  
    return res.status(200).json(
      new ApiResponse(200, updatedProduct, "Product modified successfully")
    );
  });
  

  const getProduct = asyncHandler(async (req, res) => {
    const {productId} = req.body;
    console.log(productId)
    const product = await Product.findById(productId);
    console.log(product)

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(new ApiResponse(200, product, "Product details fetched successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find();

    if (!products || products.length === 0) {
      throw new ApiError(404, 'No products found');
    }
  

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  });


const bulkProduct = asyncHandler(async (req, res) => {
    const filter = req.query.filter || "";

    const products = await Product.find({
        $or: [{
            name: {
                '$regex': filter
            }
        }]
    });

    res.json({
        products: products.map(product => ({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            owner: product.owner
        }))
    });
});



export {addProduct, modifyProduct, getAllProducts , getProduct, bulkProduct}