import express from 'express';
import quoteCtrl from '../controllers/quoteCtrl.js';
import protect from '../middleware/auth.js';

const router = express.Router()

router.get('/user-quotes/:id', protect, quoteCtrl.getUsersQuotes)
router.get('/quote/:id/:quoteId', protect, quoteCtrl.getQuote)
router.post('/calc-quote/:id?', quoteCtrl.calcQuote)
router.post('/add/:id', protect, quoteCtrl.addQuote)
router.put('/update/:id/:quoteId', protect, quoteCtrl.updateQuote)
router.put('/update-subtask/:id/:quoteId', protect, quoteCtrl.updateSubtask)
router.delete('/delete/:id/:quoteId', protect, quoteCtrl.deleteQuote)
router.post('/combine/:id', protect, quoteCtrl.combineQuotes)

export default router;