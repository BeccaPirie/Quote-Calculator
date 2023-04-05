import express from 'express';
import authCtrl from '../controllers/authCtrl.js'

const router = express.Router();

router.post('/signup', authCtrl.signUp)
router.post('/login', authCtrl.login)
router.post('/refresh-token', authCtrl.refreshToken)

export default router;