const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    totalCost: {type: Number, require: true},
    quantity: {type: Number, default: 1}
});


module.exports = mongoose.model('Orders', ordersSchema);