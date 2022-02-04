const express = require('express');
const { type } = require('express/lib/response');
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
          .then(results => {
              res.status(200).json({
                  count: results.length,
                  orders: results.map(result => {
                    return  {
                        _id: result._id,
                        product: result.product,
                        totalCost: result.totalCost,
                        quantity : result.quantity,
                        request: {
                            type: "GET",
                            url: "https://localhost:3000/order/" + result._id
                        }
                    }
                  })
              })
              console.log(result);
              
              if(response){
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