const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('multer')

const stuffCtrl = require('../controllers/stuffController')

router.post('/', auth, multer, stuffCtrl.createThing)
router.get('/:id', auth, stuffCtrl.getOneThing)
router.put('/:id', auth, multer, stuffCtrl.putThing)
router.delete('/:id', auth, stuffCtrl.deleteThing)
router.get('/', auth, stuffCtrl.getAllThings)

module.exports = router