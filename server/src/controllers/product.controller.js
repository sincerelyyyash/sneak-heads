import {Product} from '../models/product.model.js'
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import zod from 'zod';
import { uploadCloudinary } from '../utils/cloudinary.js';

const productBody = zod.object({
    name: zod.string(),
    desciption: zod.string(),
    category: zod.string(),
    price: zod.number(),
    imgURL: zod.string(),
})


const addProduct = asyncHandler(async(req,res)=>{
    const {name, description, category, price,} = req.body;

    const {success} = productBody.safeParse(req.body)
    if(!success){
        throw new ApiError(411, "Invalid Input")
    }

    if(
        [name,description,category,price,imgURL].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const productBannerLocalPath = req.files?.productBanner[0]?.path;

    if (!productBannerLocalPath) {
        throw new ApiError(400, "Product image required.")
        
    } 
    const productBanner = await uploadCloudinary(productBannerLocalPath)
    
    if(!productBanner){
        throw new ApiError(400,"Product image is required")
    }


    const product = await Product.create({
        name,
        description,
        category,
        imgURL: productBanner.url,
    });

    const createdProduct = await Product.findById(product._id)


    if(!createdProduct){
        throw new ApiError(500,"Something went wrong while adding product")
    }

    return res.status(201).json(
        new ApiResponse(200, "Product added succesfully")
    )

})


const modifyProduct = asyncHandler(async(req,res)=>{
    const {name, desciption, category, price} = req.body;

    const {success} = productBody.safeParse(req.body)
    if(!success){
        throw new ApiError(411, "Invalid Input")
    }

    const productBannerLocalPath = req.files?.productBanner[0]?.path;

    
    const productBanner = await uploadCloudinary(productBannerLocalPath)
    
   


    const product = await Product.findByIdAndUpdate(
        req.product?._id,
        {
            $set:{
                name: name,
                description: desciption,
                category: category,
                price: price,
                imgURL: productBanner?.url
            }
        }
        )

        return res
        .status(200)
        .json(new ApiResponse(200, product,"Product modified successfully"))

})

const getProduct = asyncHandler(async(req, res)=>{
    return res.status(200)
    .json(new ApiResponse(200, req.product, "Product details fetched successfully"))
})

const bulkProduct = asyncHandler( async (req, res)=>{
    const filter = req.query.filter || "";

    const product = await Product.find({
        $or: [{
            name: {
                '$regex' : filter
            }
        },
    ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


export {addProduct, modifyProduct, getProduct, bulkProduct}