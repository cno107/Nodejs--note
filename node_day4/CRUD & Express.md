# CRUD & Express

## start

+ 初期化

+  模块,模版处理   ——> **app.js**
+ 路由设计      ———> **router.js**

| 请求方法 | 请求路径         | get 参数 | post 参数                  | 备注             |
| -------- | ---------------- | -------- | -------------------------- | ---------------- |
| GET      |     /     |          |                            | 渲染首页         |
| GET      | /add    |          |                            | 渲染添加学生页面 |
| POST     | /add     |          | name、age、gender、num     | 处理添加学生请求 |
| GET      | /updata | id       |                            | 渲染编辑页面     |
| POST     | /updata  |          | id、name、age、gender、num | 处理编辑请求     |
| GET      | /delete | id       |                            | 处理删除请求     |
|          |                  |          |                            |                  |

+ html準備　　——>**index.html   addForm.html    updataForm.html**

+ データベースの準備  ---->**db.json**  

## app.js  文件及module配置
```javascript
//先安装一下express,express-art-template,body-parser
var express = require('express');   //core框架
var app = express();
//express-art-template  模版
app.engine('html', require('express-art-template')); //第一个参数引擎后缀 识别 .html文件 可以更改


var bodyParser = require('body-parser')  //express中读取post
//以下是用来识别两种post数据的格式
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var router = require('./router');   //引用自定义的路由模块

//公开可访问路径(文件夹)
app.use('/public/',express.static('./public'));
app.use('/node_modules/',express.static('./node_modules'))
//使用路由
app.use(router);

//liseten port
app.listen(3333,function () {
    console.log('PORT 3333 is running');
})
```
## router.js  路由配置 来根据接收的url 作出相对应操作
+ 第一段階　（路由设计）
```javascript
var express = require('express');
const router = express.Router()   //相当于往express.Router()中加get/post
var fs = require('fs');
var studentJS = require('./student');  //引用自定义模块(用它的方法)
    
router.get('/', function (request, respond) {
       //(带数据)渲染界面
   })

router.get('/student/add',function (req,res) {
       //跳转到添加界面 
})
router.post('/student/add',function (req,res) {
       //添加数据到数据库
       //1.读取post数据    req.body
       //2.读取数据库数据(fs), 并转为字符串parse
       //3.获取当前数据长度以便给新来的加index
       //4.再新来的stuData中加一个新对象(index),值为(string)总长度+1
       //5.在总数据中塞进新stuData  old.push(new);
       //6.再把总数据变回JSON  stringify
       //7.写进去 fs
    });

   

router.get('/student/update',function (req,res) {
      //根据id(index)来渲染不同页面
      //1.获取当前学生index      req.query
      //2.查看特定ID学生信息（返回一个obj）
      //3.渲染（表单默认值为当前index学生信息）
})
router.post('/student/update',function (req,res) {
      //更新学生信息数据库 跳转首页 并渲染
      //1.读JSON 并--——> js
      //2.用find找出和id相同下标的那个obj  返回第一个符合条件的obj
      //3.obj遍历 替换数据 for(var key in student)
      //4.js ---> JSON 并写入
})


router.get('/student/delete',function (req,res) {
       //根据id(index)删除 更新数据库 渲染
       //1.读JSON 并--——> js
       //2.用findIndex找出和id相同下标的那个obj  返回index
       //3.从总数据中splice它
       //4.js ---> JSON 并写入
     })


module.exports = router;   //一定要导出去呀！！！！
```
```javascript
//find findIndex for
var ret = students.find(function (item) {
            return item.index === 目标
        })
var stu = students.find(function (item) {
                return item.index === 目标
           //左右index均为obj
       }) 
 for(var key in old){  //遍历old让新的替换老的
                new[key] = old[key];
         }             
```
+ 第二段階　(编写上层调用)
```javascript
 //查看文件
 //参数只传一个cb就可以(readfile异步)用于在查找完之后 再1.判断error 2.render
  studentJS.find(function (error,data) {})
  
//保存数据
//第一个para传需要保存的数据
//第二个para传cb用于判断error 和 redirect
studentJS.save(req.body,function (error) {});

//特定id找学生(用于渲染更改界面)
//第一个para传id
//第二个para传cb用于1.判断error 2.render
 studentJS.findById(req.query.id,function (error,data) {})
 
//修改(在数据库)特定id的学生信息
//第一个para传 被post提交的(改过的)学生信息（obj）
//第二个para传cb用于判断error 和 redirect
 studentJS.updateById(req.body,function (error) {})
 
//删除
//第一个para传id
//第二个para传cb用于1.判断error 2.redirect
 studentJS.delete(req.query.id,function (error) {})
```
## student.js  (用来实现CRUD各个函数)
```javascript
//查看文件
exports.find = function (findCb) {
   fs.readFile('./db.json','utf8',function (error,data) {
        if(error){
          return findCb(error,null)   //这俩参是回调函数里的参数 前判断 后渲染
        }else{
          return  findCb(null,JSON.parse(data).students);
        }
    })
}

//保存数据
exports.save = function (stuData,cb) {
    fs.readFile('./db.json','utf8',function (error,data) {
        if(error){
            return cb(error)
        }
        var students = JSON.parse(data).students; //取出全部
        var length = students.length+1
        stuData.index = length.toString();

        students.push(stuData); //加进去
        var reData = JSON.stringify({students:students})
        fs.writeFile('./db.json',reData,function () {
            if(error){
                return cb(error);
            }
            cb(null);
        });

    })
}

//查看特定ID学生信息
exports.findById =function(id,cb) {
    fs.readFile('./db.json', 'utf8', function (error, data) {
        if (error) {
            return cb(error)
        }
        var students = JSON.parse(data).students;
        var ret = students.find(function (item) {
            return item.index === id
        })
        // console.log(ret);
        cb(error, ret)
    })

}

//更新
exports.updateById = function (student,cb) {

    fs.readFile('./db.json','utf8',function (error,data) {
        if(error){
            return cb(error,null)
        }else{
            var students = JSON.parse(data).students;
            //上面 是一个arr
       var stu = students.find(function (item) {
                return item.index === student.index
           //左右index均为obj
       })
            // console.log(stu);
            for(var key in student){
               stu[key] = student[key];
        }
        //此时stu(总数据中的一组数组)被更改 所以整体数据也发生了变化
            var reData = JSON.stringify({students:students})
            fs.writeFile('./db.json',reData,function () {
                if(error){
                    return cb(error);
                }
                cb(null);
            });

        }
    })
}

//删除
exports.delete = function (id,cb) {
   fs.readFile('./db.json','utf8',function (error,data) {
       if(error){
           return cb(error)
       }
       var students = JSON.parse(data).students
       //findIndex ES6 (return下标)
    var deleteId = students.findIndex(function (item) {
        return item.id === parseInt(id)
    })
       students.splice(deleteId,1);
       var fileData = JSON.stringify({
           students:students
       })
       fs.writeFile('./db.json',fileData,function (error) {
           if(error){
               return cb(error)
           }
           return cb(null);
       })
   })
}

module.exports = exports;  //给他们导出
```
