import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string)
    }catch(err){
        console.log(err)
    }
}