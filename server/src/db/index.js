import mongoose from "mongoose";
import { DB_NAME } from '../constants';

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB Connected! DB Host: ${ConnectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error ", error);
    process.exit(1);
  }
}

export default connectDB 
