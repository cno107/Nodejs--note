# router

https://www.jianshu.com/p/2cb44dbe5de8

```javascript
//GET
app.get( '/' , fnciton( req,res){
    res.send('');
})

//Post
app.get( '/' , fnciton( req,res){
    res.send('');
})
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