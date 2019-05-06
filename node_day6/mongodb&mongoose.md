# mongodb  & mongoose
# mongodb
## 启动+连接


+ 启动服务器

  ```shell
  mongod --dbpath ./db/ [--port 1234]   
  ```

+ 连接mongodb

  ```besh
  mongo  [--port 1234]    //得开新窗口
  ```

+ 数据库(database)

  - Database server  用来保存数据

  - Database client  对数据CRUD

  - **database + collection + document**

    - 在mongodb中，db和col都不需要手动创建

      在我们创建文档时,if document所在的collecttion不存在会auto create db & collection

+ mongodb设置为系统服务

## 基本命令  (show,use,db);

  ```javascript
  > show dbs  //显示当前数据库
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  > show databases    //这俩一样
  > show collections
  ```

  ```javascript
  > use cno107    //进入db
  switched to db cno107
  > db             //查看当前在哪个db
  cno107
  ```

## **データベースCRUD**

  ```javascript
  > db.<collection>.insert(doc)    //insert  自动添加唯一标识 也可以自己指定{_id:"666",name:""};
      insertOne()    //传不了arr    
      insertMany()   //传不了一个obj
  ```

  ```javascript
  > db.<collection>.find()         //query all符合条件的文档
    
  find( {key : value} )   //找所有key是value的 (可传入多个condition)   并返回一个arr
   //所以可以   find({key : value})[3] 这么来查询
    
  find().count()   //有几个
    
  findOne()  //返回第一个(文档对象)obj
  ```

  ```javascript
  > db.<collection>.update(查询condition , 新obj)  //默认情况下会使用新obj来整体替换旧obj 且只改一个
  db.collection.update(
     <query>,
     <update>,
     {     //第三个为配置参数
       upsert: <boolean>,
       multi: <boolean>,     //true为updateMany  默认false为updateOne
       writeConcern: <document>,
       collation: <document>,
       arrayFilters: [ <filterdocument1>, ... ]
     }
  )
  // 标识符
  $set ： 替换指定属性
  $unset: 删除指定属性
  db.stu.update(
  {name:"pha",age:"14"},
  {$set:{
     sex:"???"
  } 
      })
    updateOne & updateMany
  ```

  ```javascript
  >db.<collection>.remove()  //传入条件默认删除all
   db.collection.remove(
     <query>,
     {
       justOne: <boolean>,     //true删除一个
       writeConcern: <document>,
       collation: <document>
     }
  )
  
  db.<collection>.deleteOne()
  db.<collection>.deleteMany()
  db.<collection>.drop()    //del collection
  db.dropDatabase           //del db
  ```

## **属性(文档)中(文档) CRUD**

  ```javascript
  {
      "_id" : ObjectId("5cb0041463794ed9577d36c3"),
      "name" : "phb",
      "hobby" : {          
          "cities" : [ 
              "bei", 
              "shang", 
              "shen"
          ],
          "movies" : [ 
              "ABC", 
              "DEF", 
              "ZZZ", 
              "ZZZ", 
              "ZZZ", 
              "ZZZ"
          ]
      }
  }
  
  
  //如果通过内嵌文档进行查询，此时属性名  必须加引号
  db.mytest.find({"hobby.movies":"ABC"})     //query
  
  //往文档中的文档添加属性
  db.mytest.update(条件,{$push:{"hobby.movies":"ZZZ"}})   //$push重复也添加
  db.mytest.update(条件,{$addToSet:{"hobby.movies":"ZZZ"}})   //$addToSet重复就不添加
  ```

## **sort**

  ```javascript
  db.emp.find().sort({sal:-1});    //传一个condition  1:升序 -1:降序
  //传多个condition  第一个参数相等时 按第二个参数排列 以此类推……
  ```

## for循环以及 **查询操作符**

  ```javascript
  var arr = [];
  for(var i=0 ;i<20000 ; i++){
      arr.push({num:i})
      }
  db.zzz.insert(arr);
  
  //$gt  $gte  $lt  $lte   $ne  $eq
  db.zzz.find({num:{$gt:74 ,$lt:80}})
  
  //limit    显示的限制  
  db.zzz.find({num:{$gt:14 ,$lt:80}}).limit(10);
  //skip 跳过  分页数据显示  
  db.zzz.find({num:{$gt:1,$lt:100}}).skip(40).limit(10)
     //mongodb自动调整limit和skip位置
    .limit(10).skip(40) //没毛病
  ```

## **文档之间关系**

  - one  to  one

    - 在mongodb可以通过内嵌文档来体现。{a:"",b:{c:""}}

  - <span style="color:hotpink">**one  to  many** </span>

    - 一个usr对应多个订单

    - 也可以用内嵌文档。 {a:"",b:[ {c:""},{},{} ]}

    - 一个用户collection 一个订单collection，订单中添加属性 {user_id : 用户的_id值}

      查看某用户的订单

      ~~~javascript
      var a= db.usr.findOne({name:"ppp"})._id;
      var a= db.usr.find({name:"ppp"})[0]._id;
      db.order.find({user_id:a});
      ~~~

  - <span style="color:hotpink">**many  to  many **</span>

    - 分類 & 品物

      ```javascript
      db.stu.insert([
        {
            name:"stu1",
            tea_id:[ObjectId("5cb0875fe37d867c9a83bc6f"),
                    ObjectId("5cb0875fe37d867c9a83bc71")]
        }
       ])   
      ```

## **练习**

  ```javascript
  //    1000 < sal < 2000
  db.emp.find({sal:{ $gt:1000,$lt:2000}})
  
  //     sal < 1000  or sal > 2000
  db.emp.find({                                                          //使用$or
     $or:[
       {sal:{$lt:1000}},
       {sal:{$gt:2000}}
     ]
  })
  
  //查询cwb的staff
  var cwb = db.dept.find({dname:"财务部"})[0].deptno;
  db.emp.find({depno:cwb});
  
  // if (sal < 1000)   sal+=400;                                          使用$inc
  db.emp.update(
     {sal:{$lt:1000}},  //condition
     {$inc:
         {sal:400}
     }
  )
  ```
 # Mongoose
 
 + <https://mongoosejs.com/>
 
 + mongoose是一个通过node来操作的module  
 
   - 是一个**ODM**库,将数据库里的 **Document** 映射成可用node操作的 **Obj**
 
 + mongoose对象
 
   - **Schema**     規則　约定了db中doc的结构
   - **Model**        dbのcollection
   - **Document**    
 
   
 
 ##  始め
 
 ```bash
 npm i -S mongoose
 ```
 
 ```javascript
 const mongoose = require('mongoose');                                      //引库
 
 mongoose.connect("mongodb://127.0.0.1/usr",{ useNewUrlParser: true } );      //connect
 
 mongoose.connection.once("open",function () {                        //connect successed  event
     console.log("db connection success")
 })
 
  mongoose.connection.once("close",function () {
      console.log("db disconnect ")
  })
 
  mongoose.disconnect();                    //stop connrction
 ```
 
 ### **Schema**
 
   ```javascript
   var  Schema = mongoose.Schema;
   
   var stuSchema = new Schema({            
       name:String,
       age:Number,
       gender:{                    //可以传一个更具体的对象
           type:String,
           default:"female"
       },
       address:String
   });
   //module.exports = mongoose.model('user',usrSchema);  封装
   ```
 
 ### **Model**
 
   ```javascript
   var stuModel = mongoose.model("foot",stuSchema);    //创建coll 第一个参为coll名 第二为Schema结构
       //collection会自动变复数
   stuModel.create({       
       name:"PHB",
       age:20,
       address:"???"
   },function (error) {
       if(!error){
           console.log("insert scuess")
       }
   })
   ```
 
 <hr/>
 
 ## Model method （crud）
 
 ```javascript
 var stuModel = mongoose.model("foot",stuSchema);
 stuModel.create( {} , <cb>)     //第一个为要添加的obj/arr。第二个为可选参数cb
 ```
 
 ```javascript
  stuModel.find([condition] , [projection] , [options] , [cb] )     //cb return arr
  stuModel.findOne([condition] , [projection] , [options] , [cb] ) //cb return obj
   stuModel.findById( id值 , [projection] , [options] , [cb] )    // cb return obj
 //projection:映射(需要显示哪些属性)   
          {name:1 , age:1 , _id:0}  
            "name age -_id"                     0,- 代表不显示
 //options:查询选项 (skip limit……)
           {limit:3,skip:3}
 //cb 两个参数一个为error   一个docs的arr/obj(find/finOne)
 ```
 
 ```javascript
 stuModel.update([condition] , [{修改}] , [options] , [cb]);
 stuModel.updateOne([condition] , [{修改}] , [options] , [cb]);
 stuModel.updateMany([condition] , [{修改}] , [options] , [cb]);
 stuModel.replaceOne([condition] , [{修改}] , [options] , [cb]);
 //options   {multi : false}
 //cb    必须传 不传就不更改  参error
 stuModel.replaceOne({ _id:"5cb17ddf55f9df3c523faa33"},{name:"wwp",age:12},function () {});
 ```
 
 ```javascript
 stuModel.remove( [condition] , [cb] )
 stuModel.deleteOne( [condition] , [cb] )
 stuModel.deleteMany( [condition] , [cb] )
 //cb必传
 ```
 
 **count**
 
 ```javascript
 stuModel.count( [condition] , [cb] )
 //cb 参: error count
 ```
 
 <hr>
 
 ## Document  method
 
   document和集合文档一一对应， Document是Model的实例
 
 ```javascript
 // create a doc   并没有加的db
 var stuModel = mongoose.model("foot",stuSchema); 
 var stu = new stuModel({    //也可以传req.body  req.query这样的obj
     name:'phb',
     age:'20',
     address:'china'
 })
 // stu.save ( [option] , [cb] );         塞进db
 ```
 
 ```javascript
 stuModel.findOne({},"name age address -_id",{limit:3,skip:3},function (error,doc) {
    // doc.update ( {age:12} ，[opitons] , [cb] )
     doc.age = 12;
     
    // doc.remove([cb]) 
     
    //get 获取doc的属性值      doc.get("age");         
     doc.age
    //set  设置doc的属性值     doc.set("age" , 12);       db不变
     doc.age = 12; 
    
     //id/_id  
     doc.id  === doc._id
    
     
  })
 ```
 
 ```javascript
 //toObject
       将doc转换为一般js obj ，之后会失去doc的所有方法
 //使用情况
  var stu = new stuModel({
     name:'phb',
     age:'20',
     address:'china'
 })
 var stu = stu.toObject();  
 delete stu.address;        //不到这是啥  只能删普通js obj的属性 所以删不了doc obj的属性
 console.log(stu);     
 ```
 
 <hr>
 
 ##  其他method
 
 ```javascript
 Model.findOneAndRemove ( condition , [options] , [cb] )
 Model.findOneByIdAndRemove ( id , [options] , [cb] )
 //直接 .id 不用 ._id
 ```
 
 ```
 Model.findOneAndUpdate ( [condition] , [update] , [options] , [cb] )
 ```
 
 ```javascript
 //////////常用
 new stuModel( req.body ).save( cb );
 stuModel.findById( id , cb)
 stuModel.findByIdAndUpdate(id , update , cb)
 stuModel.findByIdAndDelete(id ,cb)
 ```
 
 补：mongoose api 全部支持promise
 
 
 
 
 
 

  

 

