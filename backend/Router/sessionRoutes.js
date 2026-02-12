import express from 'express'
import authUser from '../middleware/authUser.js';
import { createSession, getActiveSession, getRecentSession, getSessionID, joinSession, endSession } from '../controller/sessionController.js';

const route = express.Router();

route.post('/', authUser, createSession)
route.get('/active', authUser, getActiveSession)
route.get('/recentSession', authUser, getRecentSession)
route.get('/:id', authUser, getSessionID)
route.post('/:id/join', authUser, joinSession)
route.post('/:id/end', authUser, endSession)

export default route;