import express from 'express';
import quoteCtrl from '../controllers/quoteCtrl.js';

const router = express.Router()

router.get('/user-quotes/:id', quoteCtrl.getUsersQuotes)
router.get('/quote/:id/:quoteId', quoteCtrl.getQuote)
router.post('/calc-quote', quoteCtrl.calcQuote)
router.post('/calc-quote-admin', quoteCtrl.calcQuoteAdmin)
router.post('/add-quote/:id', quoteCtrl.addQuote)
router.put('/update-quote/:id/:quoteId', quoteCtrl.updateQuote)
router.delete('/delete-quote/:id/quoteId', quoteCtrl.deleteQuote)

export default router;