import {  requireAuth } from '@clerk/express'
import User from '../models/User.js';
const authUser = [
    requireAuth(),
    async (req, res, next) =>{
        try{
            const clerkID = req.auth().userID;
            if(!clerkID) return res.status(401).json({message:'Invalid token-clerkID'});
            
            const user = await User.findOne({clerkID:clerkID});
            if(!user) return res.status(404).json({message:'User not found in DB'});

            req.user = user;
            next();
        }
        catch(err){
            console.log('Error in authUser middleware:', err);
            res.status(500).json({message:'Internal server error'});
        }
    }
]
export default authUser;