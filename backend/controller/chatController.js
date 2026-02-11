import { chatClient } from "../src/lib/stream.js";

export async function getStreamToken(req, res)  {
    try{
        const token = chatClient.createToken(req.user.clerkID);
        res.status(200).json({
            token,
            id:req.user.clerkID,
            name:req.user.name,
            image:req.user.image
        })

    }   
    catch(err){
        console.log('Internal server error-chatcontroller:', err);
        res.status(500).json({message:'Internal server error-chatcontroller'})
    }
}