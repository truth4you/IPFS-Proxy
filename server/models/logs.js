const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
  email: { type: String, required: true },
  key: { type: String, required: true },
  uri: { type: String, required: true },
  bytes: { type: Number, required: true },
  time: { type: Date, required: true }
})

const Log = mongoose.model('logs', LogSchema)

module.exports = Log
