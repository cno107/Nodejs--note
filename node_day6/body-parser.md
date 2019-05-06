# Body-parser

```javascript
var bodyParser = require('body-parser')  //express中读取post
//以下是用来识别两种post数据的格式
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

