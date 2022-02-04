const Product = require("../models/product");

exports.get_all_products = (req, res, next) => {
    Product.find()
      .select("name price _id")
      .exec()
      .then((products) => {
        const response = {
          count: products.length,
          products: products.map((product) => {
            return {
              name: product.name,
              price: product.price,
              _id: product._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + product._id,
              },
            };
          }),
        };
        if (products) {
          res.status(200).json(response);
        } else {
          res.status(404).json({ message: "No products found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
});}