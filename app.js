var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var itemsRouter = require('./routes/items');
var Item = require('./models/item');
var app = express();
var port = 5000;

app.listen(port, function(err){
    console.log('running server on port: '+port);
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dbName = 'itemDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);

app.get('/', function(req, res){
    res.render('index.html');
});

app.use('/items', itemsRouter);
