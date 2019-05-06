
var express = require('express');
var router = express.Router();
var Usr = require('./models/user');
var Article = require('./models/article');
var Comment = require('./models/comment');
// const nodemailer = require('nodemailer')  这里直接引封装完的库
//md5
var md5 = require('blueimp-md5')

//homepage
router.get('/',function (req,res) {

  Article.find({},function (err,articleData) {
      res.render('index.html',{
          usr : req.session.usr,
          art : articleData
      });
  })

})

//register
router.get('/register',function (req,res) {
   res.render('register.html');
})
router.post('/register',function (req,res) {
   //加两次蜜
   req.body.password =  md5(md5(req.body.password))
   Usr.findOne({   //判断当前usr是否存在
      $or:[
         {email:req.body.email},{nickname:req.body.nickname}
      ]
   },function (err,data) {
      if(err){
         return req.status(500).json({
            success: false ,
            message:'server error1 --phb'
         })
      }
      if(data){
         return res.status(200).json({
            err_code:1,
            message:'email or nickname exist , please to use another one --phb'
         })

      }

         new Usr(req.body).save(function (err,usrDate) {

            if(err){
               console.log(err);
               return res.status(500).json({
                  err_code:500,
                  message:'server error --'
               })
            }
            else{
               //注册策成功 使用Session记录用户的登陆状态
               req.session.usr = usrDate;
               res.status(200).json({
                  err_code:0,
                  message:"ok"
               })
            }
         })
　　　　　　})

})

//login
router.get('/login',function (req,res) {
   res.render('login.html');
})
router.post('/login',function (req,res) {
   //1.获取数据
   //2.数据库 查询 用户名密码
   //3.发送响应数据
   //  console.log(req.body);
   Usr.findOne({email:req.body.email, password:md5(md5(req.body.password))},
       //密码查询时 别忘了加密查询
       function (err,data) {
          if(err) {
             return res.status(500).json({
                err_code: 500,
                message: err.message
             })
          }
          if(!data){
             return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid'
             })

          }
          //用户存在成功 记录session
          req.session.usr = data;
          res.status(200).json({
             err_code:0,
             message:'OK'
          })
   })
})



router.get('/settings/profile',function (req,res) {
   res.render('settings/profile.html',{
      usr : req.session.usr,
   });
})
router.get('/settings/admin',function (req,res) {

   res.render('settings/admin.html',{
      usr : req.session.usr
   });
})


//////////message send
//create new article

router.get('/topics/new',function (req,res) {
   res.render('topic/new.html',{
       usr:req.session.usr
   });
})

router.post('/topics/new',function (req,res) {
    req.body.email =  req.session.usr.email;
    req.body.nickname = req.session.usr.nickname;

    new Article(req.body).save(function (err) {
        if(err){
            console.log(err);
            return res.status(500).json({
                err_code:500,
                message:'server error --'
            })
        }
        else{


            res.status(200).json({
                err_code:0,
                message:"ok"
            })
        }
    })


})


router.get('/show1',function (req,res) {

    var articleId = req.query.id.replace(/\"/g,"");
    //render article时 往里面放一个评论collection
    Article.findOne({_id:articleId},function (err,articleData) {
        if(err){
            console.log(err);
            return res.status(500);
        }else{
            Comment.find({articleId:articleId},function (err,commentDate) {
                if(!commentDate){
                    //就渲染一个article
                 return   res.render('topic/show1.html',{
                        article : articleData,
                        usr:req.session.usr
                    })
                }else{
                    //渲染两个article & comment
                 return   res.render('topic/show1.html',{
                        article : articleData,
                        usr:req.session.usr,
                        comment:commentDate,

                    })
                }
            })

        }
    })
    Comment.findOne({articleId:articleId},function (err,data) {
        if(!data){
            console.log('ok');
            new Comment({articleId:articleId}).save(function (err) {

            })
        }
    })
})


//save update 跟人信息
router.post('/settings/update',function (req,res) {

   var curr_name = req.session.usr.nickname
  req.body.lastModified = Date.now();
   console.log(req.body);
   Usr.findOneAndUpdate({nickname:curr_name},req.body,function (err) {
     if(!err){
        res.status(200).json({
           err_code:0,
           message:'update ok'
        })
     }
   })
});


//forget password
const nodemailer = require('./emailConfigure');

router.get('/forget',function (req,res) {
    res.render('forget.html');
})
router.post('/forget',function (req,res) {
    var email = req.body.email;

    Usr.findOne({email:email},function (err,data) {
       if(!data){
            res.status(200).json({
               err_code:1,
               success:'email error'
            })
       }else{
         //发mail
          nodemailer.mailOptions.to = data.email;  //给谁发
          var fakePs = Math.floor(Math.random()*10000) ;
          nodemailer.mailOptions.text ='仮パスワード'+fakePs;    //数据库也得改
          nodemailer.transporter.sendMail(nodemailer.mailOptions, (error, info) => {
                 if (error) {
                      return console.log(error);
                 }
                console.log('Message sent: %s', info.messageId);
     // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
        });
          var fakePs_md5 = md5(md5(fakePs));
          console.log('邮箱：'+email+'---正在找回密码');
           console.log('假密码：'+fakePs);
           console.log('md5：'+fakePs_md5);
           Usr.findOneAndUpdate({email:email},{password:fakePs_md5},function (err) {
              if(!err){
                  return res.status(200).json({
                      err_code:0,
                      success:'発送成功　please check in your mail box'
                  })
              }
          });
       }
    })
})



// change password
//logic:if判断改的两次是否相同 不同报错 相同进入数据库寻找 if找不到报错 找到就改
router.post('/settings/password',function (req,res) {
   var ps = md5(md5(req.body.current));  //加密判断密码
   if(req.body.new === req.body.confirm){
     var newPs = md5(md5(req.body.new))
      Usr.findOneAndUpdate(
          {nickname:req.session.usr.nickname,password:ps},
          {password:newPs,lastModified:Date.now()},
          function (err,data) {
             //没有数据则代表当前密码输入错误 ret 3
               if(!data) {
                  res.status(200).json({
                     err_code: 3,
                     message: 'current password is wrong'
                  })
               }
               else{
                     //密码改变成功之后 还得更新数据库 删session 跳回登陆界面
                     delete req.session.usr;
                     res.status(200).json({
                        err_code:0,
                        message:'パスワード変更　成功した！！！'
                     })
                  }

          })
   }
   else{
      res.status(200).json({
         err_code:4,
         message:'new password と　confirm password同じじゃない'
      })
   }


})

//delete account
router.get('/delete',function (req,res) {
   var currName =req.session.usr.nickname;
   Usr.findOneAndRemove({nickname:currName},function () {
      console.log('del ok');
      delete req.session.usr;
      res.status(200).redirect('/register');
   });
})

//check yourself article
router.get('/settings/words',function (req,res) {
     //通过email来确认 当前用户写过多少文章
    Article.find({email:req.session.usr.email},function (err,articleData) {
        res.render('settings/words.html',{
            usr : req.session.usr,
            art : articleData
        });
    });
})
//update yourself article （编辑页面）
router.get('/edit',function (req,res) {
    var articleId = req.query.id.replace(/\"/g,"");

    Article.findOne({_id:articleId},function (err,articleData) {

        if(err){
            console.log(err);
            return res.status(500);
        }else{
            res.render('topic/edit.html',{
                article : articleData,
                usr:req.session.usr
            })
            //改完时候submit 根据id修改db

        }
    })
})
//update yourself article （提交页面）
router.post('/edit_submit',function (req,res) {
    console.log(req.body);
    var articleId = req.body.id.replace(/\"/g,"");
  Article.findOneAndUpdate(
      {_id:articleId},
      {article:req.body.article,articleName:req.body.articleName},
      function (err) {
          if(!err){
              res.status(200).json({
                  err_code:0,
                  message:"ok"
              })
          }

      })
})


//comment write
router.post('/comment',function (req,res) {
    if(!req.session.usr){  //如果当前没登陆
        return  res.status(200).json({
            err_code:1,
            message:"先にログインしてください"
        })
    }else{
       //把发表评论的用户加进 arr
       req.body.nickname = req.session.usr.nickname;
       req.body.email = req.session.usr.email;
        req.body.articleId = req.body.articleId.replace(/\"/g,"");
        // console.log(req.body);
       Comment.findOneAndUpdate(
           {articleId:req.body.articleId },
           req.body,
           function (err,data) {
               return res.status(200).json({
                   err_code:0,
                   message:'comment 発表成功'
               })
           }

       )
    }
})

//logout
router.get('/logout',function (req,res) {
   req.session.usr = null;
   res.status(200).redirect('/login');
})


module.exports = router;