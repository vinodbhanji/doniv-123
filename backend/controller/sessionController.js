import { useReducer } from "react";
import Session  from "../models/Session.js";
import { streamClient } from "../src/lib/stream.js";
import { chatClient } from "../src/lib/stream.js";

export async function createSession(req, res) {
    try{
        const {problem, difficulty} = req.body;
        const userId = req.user._id;
        const clerkID = req.user.clerkID;

        if(!problem || difficulty){
            return res.status(500).json({message:'Problme and difficulty are required'})
        }

        // generate a unique id for call/message
        const callID = `session_${DataTransfer.now()} ${Math.random().toString(36),substring(7)}`

        const session = await Session.create({problem ,difficulty, host:userId, callID});

        await streamClient.video.call('default', callID).getOrCreate({
            data:{
                created_by_id:clerkID,
                custom:{problem, difficulty, sessionID:session._id.toString()}
            },
        })
        const channel = chatClient.channel('message',{
            name:`${problem} session`,
            created_by_id:clerkID,
            members:[clerkID]
        })

        await channel.create();
        res.status(200).json({session})
    }
    catch(err){
        console.log('Error in creating session in sessionCpntroller');
        res.status(500).json({message:'Internal Server Error'});
    }
}
export async function getActiveSession(req, res) {
    try{
        const session = await Session.find({status:'active'})
        .populate('host','name image email clerkId')
        .sort({createdAt : -1})
        .limit(20)

        res.status(200).json({session})
    }
    catch(err){
        console.log('Error in getActiveSesssion controler');
        res.status(500).json({message:'Internal Server Error'})
    }
}
export async function getRecentSession(req, res) {
    try{
        const userId = req.user._id
        const session = await Session.find({
            status:'completed',
            $or: [{host:userId}, {participant:userId}]
        })
        .sort({createdAt:-1})
        .limit(20)

        res.status(200).json({session})
    }
    catch(err){
        console.log('Error in getRecentSesssion controler');
        res.status(500).json({message:'Internal Server Error'})
    }
}
export async function getSessionID(req, res) {
    try{
        const {id} = req.params;
        const session = await Session.findById(id)
        .populate('host', 'name email image clerkId')
        .populate('participant', 'name image email clerkId')
        
        if(!session) return res.status(500).json({message:'sessionn not found'})
        res.status(200).json({session})
    }
    catch(err){
        console.log('Error in getSesssionID controler');
        res.status(500).json({message:'Internal Server Error'})
    }
}
export async function joinSession(req, res) {
    try{
        const {id} = req.params
        const userId = req.user._id
        const clerkID = req.user.clerkID

        const session = await Session.findById(id);
        if(!session) return res.status(500).json({message:"session does not exist"})
        if(session.participant) return res.status(500).json({message:"session is full"})

        if(session.host.toString() == userId.toString()) return res.status(400).json({message:'Host cannot join their own session'})

        session.participant = userId
        await session.save()

        const channel = chatClient.channel('message',session.callId)
        await channel.addMembersmembers([clerkID])

        res.status(200).json({session})
    }
    catch(err){
        console.log('Error in joinSession controller');
        res.status(500).json({message:'Internal Server Error'})
    }
}
export async function endSession(req, res) {
    try{
        const {id} = req.params
        const userId = req.user._id

        const session = await Session.findById(id)
        if(!session) {
            return res.status(500).json({message:'Session not found'})
        }
        if(session.host.toString() !== userId.toString()){
            return res.status(500).json({message:'Only host can end the session'})
        }
        if(session.status == 'completed') return res.status(500).json({message:'Session already completed'})

        session.status = 'completed'
        await session.save()

        // deleting video call
        const call = streamClient.video.call('default',session.callId)
        await call.delete({hard:true})

        // deleting chat
        const channel = chatClient.channel('messaging', session.callId)
        await channel.delete();

        res.status(500).json({message:'Session deleted succesfully'})
    }
    catch(err){
        console.log('Erro in the endSession controller')
        return res.status(500).json({message:'Internal Server Error'})
    }
}