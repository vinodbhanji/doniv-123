import {ENV} from './env.js'
import { StreamChat} from 'stream-chat'
import {StreamClient} from '@stream-io/node-sdk'

const apiKey = ENV.STREAM_API_KEY
const secretKey = ENV.STREAM_SECRET_KEY

if( !apiKey || !secretKey ){
    console.log('STREAM_API_KEY or STREAM_API_KEY is missing')
}

export const chatClient = StreamChat.getInstance(apiKey, secretKey)
export const streamClient = new StreamClient(apiKey, secretKey)

export const upsertStramUser = async(userData) => {
    try{
        await chatClient.upsertUsers([userData])
        console.log("Stream User upserted successfully:", userData)
    }
    catch(error){
        console.log('Error in upserting stream user:', error)
    }
}

export const deleteStreamUser = async(userID) => {
    try{
        await chatClient.deleteUser(userID);
        console.log('stream user deleted succesfully:', userID)
    }
    catch(error){
        console.log('Error in deleting Stream user:', error)
    }
}