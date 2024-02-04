import {Product} from '../models/product.model.js'
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import zod from 'zod';

const addProductBody = zod.object({
    name: zod.string(),
    desciption: zod.string(),
    category: zod.string(),
    price: zod.number(),
    imgURL: zod.string(),
})


const addProduct = asyncHandler(async(req,res)=>{
    const {name, description, category, price, imgURL} = req.body;

    const {success} = addProductBody.safeParse(req.body)
    if(!success){
        throw new ApiError(411, "Invalid Input")
    }

    if(
        [name,description,category,price,imgURL].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const product = await Product.create({
        name,
        description,
        category,
        imgURL,
    });

    const createdProduct = await Product.findById(product._id)


    if(!createdProduct){
        throw new ApiError(500,"Something went wrong while adding product")
    }

    return res.status(201).json(
        new ApiResponse(200, "Product added succesfully")
    )

})


export {addProduct}