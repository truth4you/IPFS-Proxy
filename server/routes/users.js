const express = require('express')
const { createHash } = require('crypto')
const router = express.Router()
const User = require('../models/users')

// router.use((req, res, next) => {
//   if(req.session.user)
//     next()
//   else
//     res.status(401).json({ success: false, message: 'You have to log in first' })
// })

router.get('/', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ success: false, message: 'No user found' }))
})

// Incase we need this API
router.get('/:userId', (req, res) => {
  User.findById({ _id: req.params.userId })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ success: false, message: 'No user found by this id' }))
})

// Create user
router.post('/', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: createHash('sha256').update(req.body.password).digest('hex')
  })
  newUser
    .save()
    .then(user => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to create' + err }))
})

// Edit user
router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      email: req.body.email,
      name: req.body.name
    }
  })
    .then(user => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to edit' }))
})

// Reset password user
router.lock('/:userId', (req, res) => {
  if(!req.body.old_password)
    return res.status(500).json({ error: 'Password wrong' })
  User.findById(req.params.userId).then(user => {
    const pwd = createHash('sha256').update(req.body.old_password).digest('hex')
    if(user.password==pwd) {
      user.update({
        $set: {
          password: createHash('sha256').update(req.body.password).digest('hex')
        }
      })
        .then(ok => res.status(200).json({ success: true }))
        .catch(err => res.status(500).json({ success: false, message: 'Failed to reset' }))
    } else {
      res.status(500).json({ success: false, code: -1, message: 'Password wrong' })
    }
  }).catch(err => res.status(500).json({ success: false, message: 'Failed to reset' })) 
})

// Delete user
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .then(user => res.status(200).json({ success: true }))
    .catch(err => res.status(500).json({ success: false, message: 'Failed to delete' }))
})

module.exports = router
