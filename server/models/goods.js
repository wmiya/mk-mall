const mongoose = require('mongoose')
const Schema = mongoose.Schema
let produtSchema = new Schema({
    'productId': String,
    'productName': String,
    'salePrice': Number,
    'productImage': String,
    "productNum": Number,
    "checked": String,


})
module.exports = mongoose.model('goods', produtSchema)