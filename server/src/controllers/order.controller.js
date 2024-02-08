
import { asyncHandler } from "../utils/asyncHandler";

const newOrder = asyncHandler(async(req, res)=>{

    const {shippingInfo, orderItems} = req.body;
})