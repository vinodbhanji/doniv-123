import mongoose from 'mongoose'
import { ENV } from './env.js'

export const connDB = async() => {
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in environment variables");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to DB",conn.connection.host);
    }
    catch(error){
        console.log("Error in connecting to DB", error)
        process.exit(1);
    }
}