const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const User = require('../models/user');

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
    console.log(extension)

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

        userImage(id,res,fileName);
    });


});


function userImage(id,res,fileName){

    User.findById(id,(err,userDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'User does not exist'
                }
            });
        }

        userDB.img = fileName;

        userDB.save((err,userDB) => {

            res.json({
                ok:true,
                user: userDB,
                img: fileName
            })
        })



    });

}

function productImage(){

}

module.exports = app;