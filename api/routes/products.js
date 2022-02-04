const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); //we want to customize it below
// const path = require("path");
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, path.resolve(__dirname, `..${path.sep}..${path.sep}`, `${path.sep}utils${path.sep}uploads`));
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// });
// const upload = multer({storage: storage});

//import model
const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");
const productController = require("../controllers/products")
router.get("/", productController.get_all_products);

router.post("/", checkAuth, upload.single("productImage"), (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Handling POST requests at /product",
    createdProduct: product,
  });
});
router.get("/:productId", (req, res, next) => {
  const Id = req.params.productId;
  Product.findById(Id)
    .select("name price _id")
    .exec()
    .then((prod) => {
      const response = {
        count: prod.length,
        products: prod,
      };

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOpts = {};
  for (const opts of req.body) {
    updateOpts[opts.propName] = opts.value;
  }
  // Product.updateOne({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
  Product.update({ _id: id }, { $set: updateOpts })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.delete("/:productId", (req, res, next) => {
  const Id = req.params.productId;
  if (Id === "productId") {
    res.status(200).json({
      message: "Handling DELETE requests at /product",
      id: Id,
    });
  } else {
    res.status(404).json({
      message: "Unknown request",
    });
  }
});
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests at /product",
  });
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
