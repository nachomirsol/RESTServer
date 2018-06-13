const express = require("express");
const app = express();

app.get('/',(req,res) => {

	let person = {
		name:"Nacho",
		age:34,
		hobby:"Full-stack developer"
	}

	res.send(person);
})

app.listen(3000);