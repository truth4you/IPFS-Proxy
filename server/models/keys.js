const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KeySchema = new Schema({
  email: { type: String, required: true },
  key: { type: String, required: true },
  count: { type: Number, required: true },
  bytes: { type: Number, required: true },
  is_active: { type: Boolean, required: true }
})

const Key = mongoose.model('keys', KeySchema)

module.exports = Key
