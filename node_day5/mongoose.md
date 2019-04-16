# Mongoose

+ <https://mongoosejs.com/>

+ mongoose是一个通过node来操作的module  

  - 是一个**ODM**库,将数据库里的 **Document** 映射成可用node操作的 **Obj**

+ mongoose对象

  - **Schema**     規則　约定了db中doc的结构
  - **Model**        dbのcollection
  - **Document**    

  

###  始め

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

+ **Schema**

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
  ```

+ **Model**

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

### Model method （crud）

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

### Document  method

  document和集合文档一一对应， Document是Model的实例

```javascript
// create a doc   并没有加的db
var stuModel = mongoose.model("foot",stuSchema); 
var stu = new stuModel({
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

###  其他method

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





