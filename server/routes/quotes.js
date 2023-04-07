import express from 'express';
import quoteCtrl from '../controllers/quoteCtrl.js';

const router = express.Router()

router.get('/user-quotes/:id', quoteCtrl.getUsersQuotes)
router.get('/quote/:id/:quoteId', quoteCtrl.getQuote)
router.post('/calc-quote', quoteCtrl.calcQuote)
router.post('/add/:id', quoteCtrl.addQuote)
router.put('/update/:id/:quoteId', quoteCtrl.updateQuote)
router.delete('/delete/:id/:quoteId', quoteCtrl.deleteQuote)

export default router;