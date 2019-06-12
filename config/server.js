const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
const { request_ql } = require('graphql-request');
// var constants = require("./constants");
//initializations
const app = express();




//settings

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// constants.request_ql = request_ql;
app.use('/public', express.static('public'));
module.exports = app;

