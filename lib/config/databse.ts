import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("DATABASE CONNECTED")
    }catch(err){
        console.log(err)
    }
}