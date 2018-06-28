const express = require('express');

const { verificaToken, verificaRole } = require('../middlewares/authentication');

const Category = require('../models/category');

const app = express();


// =================================
// Get all categories
// =================================
app.get('/category', verificaToken, (req, res) => {

    Category.find({})
        .sort('name')
        .populate('user', 'name email')
        .exec((err, categories) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categories
            });

        });

});


// =================================
// Get category by id
// =================================
app.get('/category/:id', (req, res) => {

    Categoria.findById(id, (err, categoryDB) => {

        let id = req.params.id;
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'incorrect id'
                }
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });

    });

});


// =================================
// Create a category
// =================================
app.post('/category', verificaToken, (req, res) => {

    let body = req.body;
    let category = new Category({
        name: body.name,
        description: body.description,
        user: req.user._id
    });

    category.save((err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    })
});


// =================================
// Update a category
// =================================

app.put('/category/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let categoryDescription = {
        description: body.description
    }

    Category.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, categoryDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

    });

});



// =================================
// Delete a category
// =================================

app.delete('/category/:id', [verificaToken, verificaRole], (req, res) => {

    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'id does not exist'
                }
            });
        }

        res.json({
            ok: true,
            message: 'categoria borrada'
        })

    });

});

module.exports = app;