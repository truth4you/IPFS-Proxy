const express = require('express')
const { createHash } = require('crypto')
const router = express.Router()
const Key = require('../models/keys')

const generateKey = (key) => {
  return createHash('sha256').update(key).digest('hex')
}

router.get('/', (req, res) => {
  Key.find()
    .then(keys => res.status(200).json(keys))
    .catch(err => res.status(404).json({ success: false, message: 'No key found' }))
})

// Generate a new key
router.post('/', (req, res) => {
  const hash = generateKey(new Date().toString())
  const newKey = new Key({
    key: hash,
    email: req.body.email,
    count: 0,
    bytes: 0,
    is_active: false
  })
  newKey
    .save()
    .then(key => res.status(200).json({ success: true, key: hash }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to create' + err }))
})

// Activate key
router.put('/unlock/:key', (req, res) => {
  Key.updateOne({ key: req.params.key }, {
    $set: {
      is_active: true
    }
  })
    .then(key => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to activate' + err }))
})

// Deactivate key
router.put('/lock/:key', (req, res) => {
  Key.updateOne({ key: req.params.key }, {
    $set: {
      is_active: false
    }
  })
    .then(key => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to deactivate' }))
})

module.exports = router
