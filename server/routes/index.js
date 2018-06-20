
const express = require('express');

const app = express();

// require the routes file
app.use(require('./user'));
app.use(require('./login'));

module.exports = app;