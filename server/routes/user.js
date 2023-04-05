import express from 'express';
import userCtrl from '../controllers/userCtrl.js';

const router = express.Router()

router.get('/fetch-user', userCtrl.getUser)
router.put('/update-user', userCtrl.updateUser)
router.delete('/delete-user', userCtrl.deleteUser)

export default router;