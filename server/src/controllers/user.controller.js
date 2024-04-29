import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/apiResponse.js"
import zod from "zod";
import jwt from "jsonwebtoken";

const registerBody = zod.object({
    email: zod.string().email(),
    fullname: zod.string(),
    password: zod.string()
})

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong")
    }
}

const registerUser = asyncHandler(async (req, res)=>{
    const {fullname, email, password} = req.body

    const { success } = registerBody.safeParse(req.body)
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

    const existingUser = await User.findOne({email})
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

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)


   const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse( 200, 
            accessToken, refreshToken,
         "User registered in succesfully")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const { success } = loginBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    if(!email || !password){
        throw new ApiError(400,"Email and password is required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Password Incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    // const loggedInUser = await User.findById(user._id).select("-password - refreshToken")
    const loggedInUser = await User.findById(user._id).select("email fullname role")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse( 200, {
            user: loggedInUser, 
            accessToken, refreshToken
        }, "User logged in succesfully")
    )
})

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorised request")
    }

   try {
     const decodedToken=  jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id)
     if(!user){
         throw new ApiError(401, "Invalid refresh Token")
     }
 
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401, "Refresh token expired or used")
     }
 
     const options ={
         httpOnly: true,
         secure: true
     }
 
     const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
 
     return res.status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", newRefreshToken, options)
     .json(
         new ApiResponse(200, {accessToken, newRefreshToken}, "Access token renewed")
     )
   } catch (error) {
        throw new ApiError(401, error?.message ||  "Invalid refresh token")
   }
})


const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword } = req.body
    
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect){
        throw new ApiError(400, "Invalid password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res.status(200)
    .json(new ApiResponse(200, "Password save successfully"))
})

const currentUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id).select("email fullname role _id")

    return res.status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"))
})

const updateProfile =asyncHandler(async(req,res)=>{
    const {email} = req.body

    if (!email){
        throw new ApiError(400, "email is required")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                email: email
            }
        }
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Email Updated"))
})


export {registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, currentUser, updateProfile}