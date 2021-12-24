const express = require('express')
const { createHash } = require('crypto')
const router = express.Router()
const User = require('../models/users')

router.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    const pwd = createHash('sha256').update(req.body.password).digest('hex')
    if(user.password==pwd) {
      req.session.user = user
      res.status(200).json({ success: true, user: user })
    } else {
      res.status(200).json({ success: false, code: -2, message: 'Password wrong' })
    }
  }).catch(() => {
    User.count().then(cnt=>{
      if(cnt==0 && req.body.email==='admin@fleek.com' && req.body.password==='admin') {
        const user = {
          email: req.body.email
        }
        req.session.user = user
        res.status(200).json({ success: true, user: user })
      } else 
        res.status(200).json({ success: false, code: -1, message: 'User not found' })
    })
      .catch(() => res.status(200).json({ success: false, code: -1, message: 'User not found' }))
  })
})
router.get('/api/logout', (req, res) => {
  req.session.user = null
  res.status(200).json({ success: true })
})
router.get('/api/logon', (req, res) => {
  if(req.session.user)
    res.status(200).json({ success: true, user: req.session.user })
  else
    res.status(200).json({ success: false })
})

module.exports = router
