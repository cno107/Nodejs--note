# 目录列表---替换string

1. **fs.readdir ( path , callback )    cb第一个参为error    第二个参为files ** (console得到的是一个arrary)
2. 反单引号可以包含代码块 且允许换行 变量可以用**${  }** ，不用单/双引号 

```javascript

var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request',function (request,respond) {
     fs.readdir('./demo',function (error,files) {
        if(error){
            respond.end('404');
        }
        else{

            var content ='';
            files.forEach(function (i) {
                content += `
                      <tr><td data-value="aaa.html"><a class="icon file" draggable="true" href="/Users/cno.107/Desktop/node/day2/demo/aaa.html">${i}</a></td>
        <td class="detailsColumn" data-value="135">135 B</td>
        <td class="detailsColumn" data-value="1553155723">2019/03/21 17:08:43</td></tr>
                
                `
            })
    fs.readFile('./目录列表.html',function (error,data) {

          data = data.toString();
          data = data.replace('?????',content);
          respond.end(data);
      })


        }
     })
});




server.listen(1234,function () {
    console.log('server is running');
})
```

