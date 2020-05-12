const express = require('express');
const mustache  = require('mustache-express')
const router = require('./routes/index')


const app = express();
app.use('/',router);

app.use(express.json());

app.engine('mst', mustache())
app.set('view engine', 'mst');
app.set('views', __dirname + '/views')

module.exports = app;