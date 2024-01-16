const express = require('express')
const router = express.Router()
const Thing = require('../models/thing')
const stuffCtrl = require('../conrollers/stuff')

router.post('/', stuffCtrl.createThing)

router.get('/:id', stuffCtrl.getOneThing)

router.put('/:id', stuffCtrl.putOneThing)

router.delete('/', stuffCtrl.deleteThing)

router.get('/', stuffCtrl.getAllStuff)

module.exports = router