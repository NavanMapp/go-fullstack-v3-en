require('dotenv').config()
const express = require('express')
const MongoURL = process.env.MongoURL
const mongoose = require('mongoose')
const Thing = require('./models/thing')

mongoose.connect(MongoURL)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas')
    }).catch((error) => {
        console.log('Unable to connect to MongoDB Atlas')
        console.error(error)
    })

const app = express()

app.use('/', (req, res, next) => {
    console.log('A thing is happening')
})

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})
app.post('/part-one/all-stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    })
    thing.save().then(() => {
        res.status(201).json({
            message: 'Thing saved successfully'
        })
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
})

app.get('/part-one/all-stuff', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((things) => {
        res.status(200).json(things, 'Thing is found')
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })

    const stuff = [
        {
            _id: 'ohrgudv',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'uwehbfwuer',
        },
        {
            _id: 'e6g56ge',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: '',
            price: 2900,
            userId: 'uwehbfwuer',
        }
    ]
    res.status(200).json(stuff)
})

app.put('/part-one/all-stuff:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    })

    thing.updateOne({ _id: req.params.id }, thing).then(() => {
        res.status(201).json({
            message: 'Thing updated successfully'
        })
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
})

app.delete('/part-one/all-stuff', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then((thing) => {
        res.status(200).json({
            message: 'Thing Deleted'
        })
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
})

module.exports = app