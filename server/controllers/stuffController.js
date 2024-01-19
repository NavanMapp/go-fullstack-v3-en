const Thing = require('../models/Thing')
const express = require('express')
const router = express.Router()

exports.createThing = (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId 
    })
}
thing.save().then(() => {
    res.status(201).json({
        message: 'Post saved successfully'
    })
}).catch((error) => {
    res.status(400).json({
        error: error
    })
})

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((things) => {
        res.status(200).json(things, 'Thing is found')
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}

exports.putThing = (req, res, next) => {
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
}

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then( (thing) => {
        if (!thing) {
            return res.status(404).json({
                error: new Error('Thing not found')
            })
        }

        if (thing.userId !== req.auth.userId) {
            return res.status(400).json({
                error: new Error('Unauthorized request')
            })
        } 
    })
    Thing.deleteOne({ _id: req.params.id }).then((thing) => {
        res.status(200).json({
            message: 'Thing Deleted'
        })
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}

exports.getAllThings = (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things)
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
}