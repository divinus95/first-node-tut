const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: {type: Number, require: true},
   // productImage: 
});


module.exports = mongoose.model('Product', productSchema);