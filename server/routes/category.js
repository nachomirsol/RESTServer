const express = require('express');

const { verificaToken } = require('../middlewares/authentication');

const Category = require('../models/category');

const app = express();


// =================================
// Get all categories
// =================================
app.get('/category', (req,res) => {



});


// =================================
// Get category by id
// =================================
app.get('/category/:id', (req,res) => {

    

});


// =================================
// Create a category
// =================================
app.post('/category', verificaToken, (req,res) => {

    let body = req.body;
    let category = new Category({
        name: body.name,
        description:body.description,
        user: req.user._id
    });

    category.save((err,categoryDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            category:categoryDB
        });
    })
});


// =================================
// Update a category
// =================================

app.put('/category/:id', (req,res) => {

});



// =================================
// Delete a category
// =================================

module.exports = app;