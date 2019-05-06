
var mongoose = require('mongoose');



var commentSchema = new mongoose.Schema({
    articleId :{    //创建一个new文章时 自动对应那个文章见一个评论collection
        type : String,
        required:true
    },
    email : {
        type : String,
        default: '???'
    },
    nickname :{
        type : String,
         default: '???'
    },

    create_time:{
        type:Date,

        default: Date.now
    },
    comment:{
        type : String,
        default: '???'
    },


})


module.exports = mongoose.model('Comment',commentSchema);