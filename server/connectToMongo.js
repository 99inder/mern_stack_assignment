import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.DATABASE;

const connectToMongo = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!")
}

export default connectToMongo;