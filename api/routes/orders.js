const express = require('express')
const router = express.Router();

//GET any thing that reaches our orders.js passed through ./api/routes/orders
//so we just use / in our get
router.get('/', (req, res, next)=> {
   res.status(200).json({
       message: "Handling GET requests at /orders"
   }) 
});

router.post('/', (req, res, next)=> {
    const order = {
        orderId: req.body.orderId,
        totalCost: req.body.totalCost
    }
    res.status(200).json({
        message: "Handling POST requests at /orders",
        createdOrder: tot
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