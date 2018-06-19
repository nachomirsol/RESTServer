require('./config/config.js');

const mongoose = require('mongoose');
const express = require("express");
const app = express();



const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json middlewares cada petición pasa por estas lineas
app.use(bodyParser.json());

// routes global config
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, (err, res) => {
	if (err) throw err;

	console.log('connected successfully');

});


app.listen(process.env.PORT, () => {
	console.log('Escuchando el puerto: ', process.env.PORT);
});