# apache案例

根据用户输入的网址 respond对应的内容

服务器在不重启的情况下 实现可自由crud内容

只用一个if

```javascript
var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request',function (request,respond) {
    var url = request.url;
    var cno = '/Users/cno.107/Desktop/node/day2/demo';
    var path = '/index.html';   //默认路径
    if(url !== '/'){
        path = url;   //进来就说明要更改默认路径
    }
    fs.readFile(cno+path,function (error,data) {
         //你请求啥 我就让你在相应的文件目录下去找 有就读 没有就404
            if(error){
                respond.setHeader('Content-Type','text/html;charset=utf-8')
                respond.write('<h1>404 NO Found</h1>')
                respond.end('このサイトが存在しない')
            }else{
                respond.end(data);
            }
       })

});


server.listen(1357,function () {
    console.log('server is running');
})
```

