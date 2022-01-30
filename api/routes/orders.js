const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const Orders = require('../models/orders')
//GET any thing that reaches our orders.js passed through ./api/routes/orders
//so we just use / in our get
router.get('/', (req, res, next)=> {
   res.status(200).json({
       message: "Handling GET requests at /orders"
   }) 
});

router.post('/', (req, res, next)=> {
    const order = new Orders({
        _id: new mongoose.Types.ObjectId(),
        totalCost: req.body.totalCost
    });
    order.save().then(result =>{
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST requests at /orders",
        createdOrder: order
    }) 
 });

 router.delete('/:orderId', (req, res, next)=> {
     const Id = req.params.orderId;
     if(Id === 'orderId'){
         res.status(200).json({
             message: "Handling DELETE requests at /orders",
             id: Id
            }) 
        }else{
            res.status(404).json({
                message: "unknown request"
            })
        }
 });


module.exports = router;