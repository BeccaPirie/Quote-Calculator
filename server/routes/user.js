import express from 'express';
import userCtrl from '../controllers/userCtrl.js';

const router = express.Router()

router.get('/fetch-user/:id', userCtrl.getUser)
router.put('/update-user/:id', userCtrl.updateUser)
router.put('/update-password/:id', userCtrl.updatePassword)
router.delete('/delete-user/id', userCtrl.deleteUser)

export default router;