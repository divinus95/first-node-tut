const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//import model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
            .exec()
            .then(products => {
                const response = {
                    count: products.length,
                    products: products.map(product => {
                        return {
                            name: product.name,
                            price: product.price,
                            _id: product._id,
                            request: {
                                type: 'GET',
                                url: "http://localhost:3000/products/" + product._id
                            }
                        }
                    })
                }
                if(products){
                    res.status(200).json(response)
                }else{
                    res.status(404).json({message: "No products found"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
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
router.get('/:productId', (req, res, next) => {
    const Id = req.params.productId;
    Product.findById(Id)
            .select('name price _id')
            .exec()
            .then(prod => {
                const response = {
                    count: prod.length,
                    products: prod
                }

                if(response){
                    res.status(200).json(response)
                }else{
                    res.status(404).json({message: "No data found"})
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOpts = {};
    for(const opts of req.body){
        updateOpts[opts.propName]= opts.value;
    }
    // Product.updateOne({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
    Product.update({_id: id}, {$set: updateOpts})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
})
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({result})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
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
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests at /product"
    })
});
// router.get('/:productId', (req, res, next) => {
//     const Id = req.params.productId;
//     if(Id === 'productId'){
//         res.status(200).json({
//             message: "Handling GET requests at /product",
//             id: Id
//         })
//     }else {
//         res.status(404).json({
//             message: "Unknown request"
//         })
//     }
// });
module.exports = router;