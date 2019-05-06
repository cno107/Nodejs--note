# まとめ
+ app.jsの配置
```javascript
var express = require('express');    //web server  framework
var app = express();
var path = require('path');

app.engine('html',require('express-art-template'));   //express render engine
app.set('views',path.join(__dirname,'views'));   //set views path


app.use('/public/',express.static(path.join(__dirname,'public')));   //public static source
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))


var bodyParser = require('body-parser')      //express中读取post
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


var router = require('./router');     //require router and use it
app.use(router);

app.listen(5555,function f() {       // listen port
    console.log('port 5555 is running');
})
```
+ router.jsの配置(一)
```javascript

var express = require('express');
var router = express.Router();
var Usr = require('./models/user'); //引用mongoose的 module.exports = mongoose.model('name',Schema);
//md5
var md5 = require('blueimp-md5')
//req.body.password =  md5(md5(req.body.password))
 
module.exports = router;
```
+ **mongooseのSchema的配置 & model的导出**
```javascript

var mongoose = require('mongoose');

var usrSchema = new mongoose.Schema({
   gender:{
      type:Number,
      required:true,
      default:-1,
      enum:[-1,0,1]
    },
    create_time:{
       type:Date,
        //这里不要用Date.now() 因为会立即调用
        //所以给一个方法 当创建new Model时且没有传create_time时自动调用此方法
        default: Date.now
    },
    
    avatar:{
       type:String,
        default:'/public/img/avatar-default.png'
    },
    status:{
       type:Number,
        //0无限制  1不可评论   2不可登陆
        enum:[0,1,2],
        default:0
    }
});

module.exports = mongoose.model('user',usrSchema);
```