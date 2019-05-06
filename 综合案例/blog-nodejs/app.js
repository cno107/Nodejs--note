var express = require('express');
var app = express();
var path = require('path');

app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'views'));

// app.use('/views/',express.static(path.join(__dirname,'views')));
app.use('/public/',express.static(path.join(__dirname,'public')));
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))


var bodyParser = require('body-parser')  //express中读取post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


//connect mongodb
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/node-web-blog",{ useNewUrlParser: true });
mongoose.connect('open',function () {
    console.log("mongodb has connected")
})
//md5

//session
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//
var router = require('./router');
app.use(router);

app.listen(5555,function f() {
    console.log('port 5555 is running');
})