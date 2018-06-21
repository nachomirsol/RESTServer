const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const User = require('../models/user');
const {verifyToken} = require('../middlewares/authentication');
const app = express();



app.get('/user', (req, res) => {

let from = req.query.from || 0;
from = Number(from);

let limit = req.query.limit || 5;

limit = Number(limit);

    User.find({status:true},{name:1,email:1})
        .skip(from)
        .limit()
        .exec((err,users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({status:true},(err,count) => {

                res.json({
                    ok:true,
                    users,
                    total:count
                });

            });           
    })

});



app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password, 10),
        role:body.role
    });

    user.save( (err,userDB) => {

        if (err){
            return res.status(400).json({
                ok:false,
                err:err
            });
        }

        
        res.json({
            ok:true,
            user:userDB
        });

    });

    if (body.name === undefined) {

        res.status(400).json({
            ok: false,
            message: 'name is required'
        });
    }

});


app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body,['name','email','img','role','status']);

    User.findByIdAndUpdate(id, body,{new:true,runValidators:true},(err,userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            user:userDB
        })

    });

});


app.delete('/user/:id', (req, res) => {

    let id = req.params.id;

    User.findByIdAndRemove(id,(err,deletedUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!deletedUser){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'User not found'
                }
            })
        }

        res.json({
            ok:true,
            user:deletedUser
        });

    });

    

});

module.exports = app;