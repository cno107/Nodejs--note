# Express & art-template

#### install

```bash
npm install --save art-template
npm install --save express-art-template
```

#### demo  （render里面的路径默认为views文件夹下）

```javascript
var express = require('express');
var app = express();
app.engine('html', require('express-art-template')); //第一个参数引擎后缀 识别 .html文件 可以更改
// app.set('view options', {
//     debug: process.env.NODE_ENV !== 'production'
// });
app.set('views','./views');  //default 第一个参数为‘views’属性值 ，第二个参数可以更改视图文件

app.get('/', function (request, respond) {
      respond.render('index.html',{     //render里面的路径默认为views文件夹下    (views)省略
          content:content,
      })
});

//也可以传无模版页面
app.get('/', function (request, respond) {
      respond.render('？？？.html'）    //这样可以不用fs
});

```

#### set  default render path

```javascript
app.set('views','./lol');    //第一个参数固定为views，第二个参数为path
```

#  art-template ( include-extend-block )

```
{{include './header.art'}}     //可以拿到目标内的代码 直接放进去
```

```php+HTML
{{extend './home.html'}}     // 继承整个页面
{{block 'content'}}         //替换部分
<h1>可以替换content</h1>
{{/block}}
```

![QQ20190417-0](./QQ20190417-0.jpg)

![0846F58D-3C78-4252-A336-030231D30483](./0846F58D-3C78-4252-A336-030231D30483.png)

