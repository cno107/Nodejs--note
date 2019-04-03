# 文件操作 搭建web服务器  Content-Type

### 文件操作

​    fs.readeFile('a.txt',function(error , data ){ });

    ```
 fs.readeFile('a.txt',  'utf8 '   ,function(error , data ){ });   可选参数可代替data.toString
    ```

```javascript
var fs = require('fs')

// 2. 读取文件
//    第一个参数就是要读取的文件路径
//    第二个参数是一个回调函数
//          
//        成功 data 数据               error null
//        失   data undefined没有数据  error 错误对象
fs.readFile('./data/a.txt', function (error, data) {
  // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
  // 所以我们可以通过 toString 方法把其转为我们能认识的字符
  if (error) {
    console.log('读取文件失败了')
  } else {
    console.log(data.toString())
  }
    
    
    // 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数
//    error
//    
//    成功：
//      文件写入成功
//      error 是 null
//    失败：
//      文件写入失败
//      error 就是错误对象
fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
  // console.log('文件写入成功')
  // console.log(error)
  if (error) {
    console.log('写入失败')
  } else {
    console.log('写入成功了')
  }
})
})
```

###  搭建web服务器 

```javascript

var http = require('http')
var server = http.createServer()


//    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
server.on('request', function () {
  console.log('收到客户端的请求了')
})

// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```



```javascript
server.on('request', function (request,respond) {
     console.log('收到请求了，请求路径是：' + request.url)
  console.log('请求的客户端地址：', request.socket.remoteAddress,request.socket.remotePort)
})
// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息

```

```javascript
// response 对象有一个方法：write 可以用来给客户端发送响应数据
// write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
response.write('hello')
// 告诉客户端，我的话说完了，你可以呈递给用户了
response.end('结束了')
```

### Content-Type

```javascript
var url = req.url

if (url === '/plain') {
  // text/plain 就是普通文本
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('hello 世界')
} else if (url === '/html') {
  // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('<p>hello html <a href="">点我</a></p>')
}
```

## 综合

```javascript
server.on('request', function (req, res) {

  var url = req.url

  if (url === '/') {
   // 我们要发送的还是在文件中的内容
    fs.readFile('./resource/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/xiaoming') {
    fs.readFile('./resource/ab2.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败，请稍后重试！')
      } else {
       // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  }
})
```

