const express = require('express');

const fs = require('fs');
const path = require('path');

let app = express();

app.get('/image/:type/:img', (req,res) => {

    let type = req.params.type;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else{
        res.sendFile(noImagePath);
    }

    let noImagePath = path.resolve(__dirname,'../assets/no-image.pdf');

    res.sendFile(noImagePath);

});

module.exports = app;