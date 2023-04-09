import express from 'express';
import paygradesCtrl from '../controllers/paygradesCtrl.js';
import protect from '../middleware/auth.js';

const router = express.Router()

router.get('/', paygradesCtrl.getPaygrades)
router.post('/add', protect, paygradesCtrl.addPaygrade)
router.put('/update/:id', protect, paygradesCtrl.updatePaygrades)
router.put('/delete', protect, paygradesCtrl.deletePaygrades)

export default router;