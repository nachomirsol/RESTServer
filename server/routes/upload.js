const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const User = require('../models/user');
const Product = require('../models/product');

const fs = require('fs');
const path = require('path');

//default options
app.use(fileUpload());

app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;

    if (!req.files) {

        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No file has been selected'
                }
            });
    }

    // validate type of file
    let allowedTypes = ['products', 'users'];
    if (allowedTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Allowed types: ' + allowedTypes.join(', '),

            }

        });
    }


    let file = req.files.file;
    let fileNameExtension = file.name.split('.');
    let extension = fileNameExtension[fileNameExtension.length - 1];

    // allowed extensions
    let extensions = ['png', 'jpg', 'pdf', 'jpeg', 'gif'];

    if (extensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Extension not allowed. Allowed extensions are ' + extensions.join(', ')
            }
        })
    }

    // Change file name
    let fileName = `${id}-${new Date().getMilliseconds()}.${extension}`;

    file.mv(`uploads/${type}/${fileName}`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            })

        // Image loaded
        if(type ==='users'){
            userImage(id, res, fileName);
        }else{
            productImage(id,res,fileName);
        }
        
        
    });


});


function userImage(id, res, fileName) {

    User.findById(id, (err, userDB) => {

        if (err) {

            deleteFile(fileName, 'users');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {

            deleteFile(fileName, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            });
        }


        userDB.img = fileName;

        userDB.save((err, userDB) => {

            res.json({
                ok: true,
                user: userDB,
                img: fileName
            })
        })

    });

}

function productImage(id, res, fileName) {

    Product.findById(id, (err, productDB) => {

        if (err) {

            deleteFile(fileName, 'products');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {

            deleteFile(fileName, 'products');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product does not exist'
                }
            });
        }


        deleteFile(productDB.img,'products');

        productDB.img = fileName;

        productDB.save((err, productDB) => {

            res.json({
                ok: true,
                product: productDB,
                img: fileName
            });
        });
    });
}


function deleteFile(fileName, type) {

    let pathUrl = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);

    if (fs.existsSync(pathUrl)) {
        fs.unlinkSync(pathUrl);
    }

}

module.exports = app;