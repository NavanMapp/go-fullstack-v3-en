const express = require('express')
const router = express.Router()
const Thing = require('../models/Thing')

const stuffCtrl = require('../controllers/stuff')

router.get('/', stuffCtrl.getAllStuff)
router.post('/', stuffCtrl.createThing)
router.get('/:id', stuffCtrl.getOneThing)
router.put('/:id', stuffCtrl.putThing)
router.delete('/', stuffCtrl.deleteThing)


module.exports = router