require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

//SetUp middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/animals', require('./routes/animalRouter'))

// Connection to MongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

module.exports = app;