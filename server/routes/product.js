const express = require('express');

const { verificaToken } = require('../middlewares/authentication');

let app = express();

let Product = require('../models/product');


// =================================
// Get all products
// =================================
app.get('/product', (req, res) => {

})




// =================================
// Get product by id
// =================================





// =================================
// create product
// =================================
app.post('/product', verificaToken, (req, res) => {

    let body = req.body;

    let product = new Product({
        user: req.user._id,
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        available: body.available,
        category: body.category
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        })
    });
});




// =================================
// update product
// =================================
app.put('/product/:id', (req, res) => {

    let body = req.body
    let id = req.params.id;

    Product.findById(id, (err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: 'The product does not exists'
            });
        }

        productDB.name = body.name;
        productDB.unitPrice = body.unitPrice;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, productSaved) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productSaved
            });
        })
    });

});




// =================================
// delete product
// =================================


module.exports = app;