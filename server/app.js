require('dotenv').config()
const express = require('express')
const MongoURL = process.env.MongoURL
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

const app = express()

mongoose.connect(MongoURL)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas')
    }).catch((error) => {
        console.log('Unable to connect to MongoDB Atlas')
        console.error(error)
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(bodyParser.json())
app.use('/part-one/all-stuff', stuffRoutes)
app.use('/part-three/auth', userRoutes)

app.use('images', express.static(path.join(__dirname, 'images')))

module.exports = app