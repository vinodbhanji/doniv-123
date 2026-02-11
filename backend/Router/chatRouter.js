import express from 'express'
import authUser from '../middleware/authUser.js';
import {getStreamToken} from '../controller/chatController.js'
const router = express.Router();
router.get('/token',authUser, getStreamToken); //api/chat/token
export default router;