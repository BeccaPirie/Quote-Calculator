import express from 'express';
import userCtrl from '../controllers/userCtrl.js';
import protect from '../middleware/auth.js';

const router = express.Router()

router.put('/update-user/:id', protect, userCtrl.updateUser)
router.put('/update-password/:id', protect, userCtrl.updatePassword)
router.delete('/delete-user/id',protect, userCtrl.deleteUser)

export default router;