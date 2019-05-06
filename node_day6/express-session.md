# express-session

 Cookie可以保存一些不太敏感的数据

+ 在Express中 默认不支持 Session 和 Cookie

  所以使用中间件 ```express-session```

  - npm i -S
  - router 之前配置
  - 配置好之后可以用 ```req.session```来访问和设置session成员
    - add ：  ```req.session.foo = 'bar'```
    - access： ```req.session.foo```

```javascript
var session = require('express-session')     

app.use(session({
  secret: 'keyboard cat',  //配置加密字符串，他会在原有密码基础上加上这个字符串来去加密。
                            //增加安全性 防止客户端恶意伪造
  resave: false,        
  saveUninitialized: true   //无论是否使用session 都会默认给我一把钥匙
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  } 
    // get the url pathname
  var pathname = parseurl(req).pathname
 
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
 
  next()
})
```

+ 默认session数据是内存存储的，服务器一旦重启就会丢失

  真正的生产环境会把Session进行持久化存储