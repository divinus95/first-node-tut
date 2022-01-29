const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests at /product"
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests at /product"
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