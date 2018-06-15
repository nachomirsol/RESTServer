require('./config/config.js');
const express = require("express");
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json middlewares cada petición pasa por estas lineas
app.use(bodyParser.json());


app.get('/usuario', (req, res) => {

	res.json('get Usuario');

});


app.post('/usuario:id', (req, res) => {

	let body = req.body;

	if (body.name === undefined) {

		res.status(400).json({
			ok: false,
			message: 'name is required',
		});
	}

	res.json({
		user: body
	});

});


app.put('/usuario', (req, res) => {

	let id = req.params.id;

	res.json({
		id
	});

});


app.delete('/usuario', (req, res) => {

	res.json({

	});
})

app.listen(process.env.PORT, () => {
	console.log('Escuchando el puerto: ', process.env.PORT);
});