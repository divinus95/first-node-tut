const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const morgan = require('morgan');

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');

mongoose.connect("mongodb+srv://divinus:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.feacr.mongodb.net/node-js-tut-shop-db?retryWrites=true&w=majority", 
    {
    //useMongoClient: true
    }
);

app.use(morgan('dev'));//logs
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//enable cors
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
                'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                if(req.method === 'OPTIONS'){
                    //browsers send options requests first when the method is post or put
                    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
                    return res.status(200).json({})
                }
                next(); /// other routes should work
})

//Routes which handle our requests
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