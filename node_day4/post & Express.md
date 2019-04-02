# post & Express

### body-parser

```bash
npm i -S body-parser
```

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

```javascript
////////
//GET
req.query

//POST
req.body
```

https://www.jianshu.com/p/cd3de110b4b6

# 补充(POST请求的数据格式)

```javascript

application/x-www-form-urlencoded  //浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据

multipart/form-data  //必须让 form 的 enctyped 等于这个值

application/json  //用来告诉服务端消息主体是序列化后的 JSON 字符串

text/xml
```

## 拓展 form标签的 enctype 属性

| 值                                | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 "+" 加号，但不对特殊字符编码。                    |