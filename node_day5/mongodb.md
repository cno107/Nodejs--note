# mongodb



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

+ 基本命令  (show,use,db);

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

+ **データベースCRUD**

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

+ **属性(文档)中(文档) CRUD**

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

+ **sort**

  ```javascript
  db.emp.find().sort({sal:-1});    //传一个condition  1:升序 -1:降序
  //传多个condition  第一个参数相等时 按第二个参数排列 以此类推……
  ```

+ for循环以及 **查询操作符**

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

+ **文档之间关系**

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

+ **练习**

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

  

