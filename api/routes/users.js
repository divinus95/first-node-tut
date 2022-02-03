const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

router.post('/signup', (req, res, next)=> {
    User.find({email: req.body.email})
        .exec()
        .then(result =>{
            if(result.length >= 1){
                return res.status(409).json({message: "email already chosen"})
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                       return res.status(500).json({
                            error: err
                        });
                    }else {
                        const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        surName: req.body.surName,
                        firstName: req.body.firstName,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(result => {
                            res.status(201).json({
                                result: result
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                }
            });
            }
        })
      
});


module.exports = router;