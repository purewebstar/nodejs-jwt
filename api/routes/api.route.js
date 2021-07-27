/** importing dependencies */
import express from 'express'

/** importing controllers */
import {createUser, readUser, readUserInfo} from '../controllers/api.controller.js'
import { authenticate } from '../middlewares/Authenticate.js'

const router = express.Router()

//GET HTTP
router.get('/read-user-info', authenticate, readUserInfo)

// POST HTTP
router.post('/create-user', createUser)
router.post('/read-user', readUser)

export default router