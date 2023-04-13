import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import quotesRoute from './routes/quotes.js';
import paygradesRoute from './routes/paygrades.js';

const app = express();
const PORT = config.port
const MONGODB_URI = config.mongoUri

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(MONGODB_URI)

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/quotes', quotesRoute)
app.use('/api/paygrades', paygradesRoute)

app.use('*', (req, res)=>{
    res.status(404).json({error: "not found"})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

export default app