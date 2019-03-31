# Express start

```javascript
var express = require('express');
var app = express();
app.use('/public',express.static('./public/'))
//公开指定目录

app.get('/',function (request,respond) {
    respond.send('');
    console.log(request.query);   //获取get请求的数据
})

app.listen(3000,function () {
    })
```