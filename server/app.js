const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const Key = require('./models/keys')
const Log = require('./models/logs')
const home = require('./routes/home')
const users = require('./routes/users')
const keys = require('./routes/keys')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'Fleek Backend'
}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.use('/', home)
app.use('/ipfs', (req,res,next) => {
  if(req.query.API_KEY) {
    Key.findOne({key:req.query.API_KEY, is_active:true}).then(key=>{
      if(key && key.is_active) {
        Promise.all([
          Key.updateOne({key:key.key},{
            $set: {
              count: (key.count?key.count:0)+1,
              bytes: (key.bytes?key.bytes:0)+req.socket.bytesRead
            }
          }),
          new Log({
            email: key.email,
            key: key.key,
            uri: req.url,
            bytes: req.socket.bytesRead,
            time: new Date
          }).save()
        ]).then(()=>{
          next()
        })
      } else
        throw new Error('error')
    }).catch(e=>{
      res.end('Not Allowed Request')    
    })
  } else
    res.end('Not Allowed Request')  
})
app.use('/api/users', users)
app.use('/api/keys', keys)
app.use('/ipfs', createProxyMiddleware({
  target: 'http://127.0.0.1:5001',
  changeOrigin: true,
  pathRewrite: {
      [`^/ipfs`]: '',
  },
}));

const db = 'mongodb://localhost:27017/fleek'
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err)) // Maybe return res code 500

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  const host = server.address().address
  console.log(`server runs on host ${host}, port ${PORT}`)
})
