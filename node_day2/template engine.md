# template engine

```javascript

// npm init 格式化
// npm install art-template
//下载啥require就传什么
var template = require('art-template');
```

```javascript
template.render(string,{ 替换内容 });
```

## 思路

1. 建server， fs读取html文件(かつtoString)
2. template.render(string,{ })改文件
3. respond.end() 像客户端输出

```javascript
//express-art-template
res.render('index.html',{
           student:dataJs,
           pro:dataJss,
       })
//////////////
{{each pro}}
        {{if student.work === $value.id}}
       {{$value.work}}
        {{else}}
       {{$value.name}}
       {{/if}}
        {{/each}}
```

