

var mongoose = require('mongoose');



var articleSchema = new mongoose.Schema({
    email : {
        type : String,
        required:true
    },
    nickname :{
        type : String,
        required:true
    },

    create_time:{
        type:Date,
        //这里不要用Date.now() 因为会立即调用
        //所以给一个方法 当创建new Model时且没有传create_time时自动调用此方法
        default: Date.now
    },

    articleName:{
        type:String,
        default:''
    },
    article:{
        type:String,
        default:''
    },
    create_time: {
        type:Date,
        default:Date.now
    }





});

module.exports = mongoose.model('Article',articleSchema);
