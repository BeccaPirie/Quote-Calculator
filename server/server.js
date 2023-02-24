const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const authRoute = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/server/auth', authRoute)

app.use('*', (req, res)=>{
    res.status(404).json({error: "not found"})
})

export default app