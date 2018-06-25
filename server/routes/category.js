const express = require('express');

const { verifyToken } = require('../middlewares/authentication');

const Category = require('../models/category');

const app = express();


module.exports = app;