const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const morgan = require('morgan');

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');

app.use(morgan('dev'));//logs
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

//handle error
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);//forwards the req (error) instead of the original
})

//errors from anywhere else such as db
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;