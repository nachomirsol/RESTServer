const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();

app.post('/login',(req,res) => {

    let body = req.body;

    User.findOne({email:body.email},(err, userDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Incorrect (user) or password'
                }
            });
        }

        // tomar la password, encriptarla y hacer match, es lo que hace la funció.n Regresa un true o false si hay match o no
        if(!bcrypt.compareSync(body.password ,userDB.password)){
            
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Incorrect user or (password)'
                }
            });
        }

        // si nos logueamos correctamente regresamos token

        let token = jwt.sign({
            user:userDB   
        },process.env.SEED,{expiresIn: process.env.EXPIRATION_TOKEN});

        res.json({
            ok:true,
            user:userDB,
            token:token
        });

    });

});


module.exports = app;