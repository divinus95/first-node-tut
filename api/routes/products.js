const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//import model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests at /product"
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {console.log(result)}).catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST requests at /product",
        createdProduct: product
    })
});

router.delete('/:productId', (req, res, next) => {
    const Id = req.params.productId;
    if(Id === 'productId'){
        res.status(200).json({
            message: "Handling DELETE requests at /product",
            id: Id
        })
    }else {
        res.status(404).json({
            message: "Unknown request"
        })
    }
});
module.exports = router;