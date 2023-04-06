import express from 'express';
import paygradesCtrl from '../controllers/paygradesCtrl.js';

const router = express.Router()

router.get('/', paygradesCtrl.getPaygrades)
router.post('/add', paygradesCtrl.addPaygrade)
router.put('/update', paygradesCtrl.updatePaygrades)
router.put('/delete', paygradesCtrl.deletePaygrades)

export default router;