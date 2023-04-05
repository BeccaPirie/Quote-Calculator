import express from 'express';
import quoteCtrl from '../controllers/quoteCtrl.js';

const router = express.Router()

router.get('/user-quotes', quoteCtrl.getUsersQuotes)
router.get('/quote', quoteCtrl.getQuote)
router.post('/add-quote', quoteCtrl.addQuote)
router.post('/add-quote-admin', quoteCtrl.addQuoteAdmin)
router.put('/update-quote', quoteCtrl.updateQuote)
router.delete('/delete-quote', quoteCtrl.deleteQuote)

export default router;