
var mongoose = require('mongoose');



var usrSchema = new mongoose.Schema({
   nickname : {
       type : String,
       required:true
   },
   email:{
       type:String,
       required: true,
   },
   password:{
       type:String,
       required: true,
   },
    gender:{
      type:Number,
      required:true,
      default:-1,
        // -1秘密　0男　1女
      enum:[-1,0,1]
    },
    create_time:{
       type:Date,
        //这里不要用Date.now() 因为会立即调用
        //所以给一个方法 当创建new Model时且没有传create_time时自动调用此方法
        default: Date.now
    },
    lastModified:{
        type:Date,
        default: Date.now
    },
    avatar:{
       type:String,
        default:'/public/img/avatar-default.png'
    },
    bio:{
       type:String,
        default:''
    },
    birthday:{
      type:String,
    },
    status:{
       type:Number,
        //0无限制  1不可评论   2不可登陆
        enum:[0,1,2],
        default:0
    }



});

module.exports = mongoose.model('user',usrSchema);
