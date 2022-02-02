const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const Orders = require('../models/orders')
//GET any thing that reaches our orders.js passed through ./api/routes/orders
//so we just use / in our get
router.get('/', (req, res, next)=> {
    Orders.find()
          .select('_id totalCost quantity product')
          .populate('product', '_id name')
          .exec()
          .then(result => {
              console.log(result);
              var response = {
                  count: res.length,
                  orders: result
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

router.post('/', (req, res, next)=> {
    const order = new Orders({
        _id: new mongoose.Types.ObjectId(),
        totalCost: req.body.totalCost,
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => {console.log(result)}).catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST requests at /order",
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