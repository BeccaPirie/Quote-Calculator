import express from 'express';
import paygradesCtrl from '../controllers/paygradesCtrl.js';

const router = express.Router()

router.get('/', paygradesCtrl.getPaygrades)
router.put('/update', paygradesCtrl.updatePaygrades)

export default router;