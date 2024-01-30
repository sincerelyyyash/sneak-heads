import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/apiResponse.js"
import zod from "zod";

const registerBody = zod.object({
    email: zod.string().email(),
    fullname: zod.string(),
    password: zod.string()
})

const registerUser = asyncHandler(async (req, res)=>{
    const {fullname, email, password} = req.body

    const { success } = signUpBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    
    if(
        [fullname,email,password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existingUser = User.findOne({email})
    if(existingUser){
        throw new ApiError(409, "User Already exists")
    }

    const user = await User.create({
        fullname,
        email,
        password, 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while signing up user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export {registerUser}