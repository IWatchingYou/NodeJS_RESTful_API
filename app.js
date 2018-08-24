const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const newRoute = require('./routes/new');

mongoose.connect('mongodb://localhost:27017/newdb', {useNewUrlParser: true});
mongoose.createConnection();

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/api/v1', newRoute);

module.exports = app;