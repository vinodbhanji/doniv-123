import mongoose from 'mongoose'
import { ENV } from './env.js'

export const connDB = async() => {
    try{
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to DB",conn.connection.host);
    }
    catch(error){
        console.log("Error in connecting to DB", error)
        process.exit(1);
    }
}