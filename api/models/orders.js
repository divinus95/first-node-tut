const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    totalCost: Number
});


module.exports = mongoose.model('Orders', ordersSchema);