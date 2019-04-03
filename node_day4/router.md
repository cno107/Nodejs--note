# router

https://www.jianshu.com/p/2cb44dbe5de8

```javascript
//app.js
var express = require('express');
var app = express();
var router = require('./router');   //引用那个文件(即module.exports)

 app.use(router);       //use他。  获取直接app.use(require('./router')); 
```

```javascript
//router.js
var express = require('express');
const router = express.Router()     //express里面有一个Router()方法

router.get('/', function (request, respond) {})  //全用router

module.exports = router;       //导出去
```

### use

+ **静态server**

app.use(path,callback)中的callback既可以是router对象又可以是函数

```javascript
app.use('/public/' , express.staic('./public/') );
app.use( express.staic('./public/') );    //访问时省略/public
app.use('/staic' , express.staic('./public/') );   //给定一个虚拟path /staic
//。  ：port/staic/img/1.png
```

 http://expressjs.com/en/starter/static-files.html

https://www.jianshu.com/p/1d92463ebb69