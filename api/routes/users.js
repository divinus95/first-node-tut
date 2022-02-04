const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/users");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({ message: "email already chosen" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              surName: req.body.surName,
              firstName: req.body.firstName,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  result: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1){
          return res.status(401).json({ message: "auth failed" });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
                return res.status(401).json({ message: "auth failed" });
            }
            if(result){
              const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
              }, process.env.JWT_KEY,
              {
                expiresIn: "2h"
              });
                return res.status(200).json({
                    message: "success",
                    token: token
                });
            }
            res.status(401).json({ message: "auth failed" }); 
        })
    })
    .catch();
});

module.exports = router;
