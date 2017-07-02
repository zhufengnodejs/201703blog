let express = require('express');
let {User} = require('../model');
let {checkLogin,checkNotLogin}= require('../authware');
//如果表单的type=multipart/form-data的话，bodyParser只能处理二种类型 form json
//这是一个专门用来处理文件上传的中间件
let multer = require('multer');
//dest 用来指定上传的文件存放的目录
//此文件路径应该是相对于server.js所在目录
//也就是说相对于启动的入口文件
let upload = multer({dest:'./public'});

//Router是一个方法，调用此方法会返回一个路由中间件的实例
let router = express.Router();
//当客户端以GET方法访问 /user/signup路径的时候会执行此路由函数
router.get('/signup',checkNotLogin,function(req,res){
  //渲染views目录下面的signup模板
  res.render('user/signup',{title:'用户注册'});
});
router.post('/signup',checkNotLogin,upload.single('avatar'),function(req,res){
  //avatar 是表单中的input=file元素的name属性
  //req.file 指的是上传的文件信息 req.body 包含文本字段
  let user = req.body;
  // /886a98f0d937153efb6f36878a5e8936
  user.avatar = `/${req.file.filename}`;
  User.findOne({username:user.username},function(err,oldUser){
    if(err){
      req.flash('error',err);
      res.redirect('back');
    }else{
      if(oldUser){
        req.flash('error','这个用户名已经有人用了，你换个用户名吧');
        res.redirect('back');
      }else{
        User.create(user,function(err,doc){
          if(err){
            res.redirect('back');
          }else{
            res.redirect('/user/signin');
          }
        });
      }
    }
  })

});
router.get('/signin',checkNotLogin,function(req,res){
  res.render('user/signin',{title:'用户登录'});
});
router.post('/signin',checkNotLogin,function(req,res){
  let user  = req.body;
  User.findOne(user,function(err,doc){
     if(err){
       req.flash('error',err);
       res.redirect('back');
     }else{
       if(doc){//如果doc有值，则表示查到数据了，如果没有值null则表示没有查找
         //如果登录成功之后，会把对象放到会话中去
         //session是跨请求保存数据
         req.flash('success','恭喜你登录成功');
         req.session.user = doc;
         res.redirect('/');
       }else{
         req.flash('error','登录失败');
         res.redirect('back');
       }
     }
  })
});
router.get('/signout',checkLogin,function(req,res){
  req.session.user = null;
  res.redirect('/user/signin');
});

//一定要先行导出此路由中间件
module.exports = router;

/**
 * {
 * fieldname: 'avatar', 字段名
  originalname: 'avatar.png',原始的文件名
  mimetype: 'image/png', 文件类型
  destination: './public', 目标，目的地
  filename: '886a98f0d937153efb6f36878a5e8936',
  path: 'public\\886a98f0d937153efb6f36878a5e8936',
  size: 12633 }
 **/