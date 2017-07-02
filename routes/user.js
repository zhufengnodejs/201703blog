let express = require('express');
let {User} = require('../model');
let {checkLogin,checkNotLogin}= require('../authware');
//Router是一个方法，调用此方法会返回一个路由中间件的实例
let router = express.Router();
//当客户端以GET方法访问 /user/signup路径的时候会执行此路由函数
router.get('/signup',checkNotLogin,function(req,res){
  //渲染views目录下面的signup模板
  res.render('user/signup',{title:'用户注册'});
});
router.post('/signup',checkNotLogin,function(req,res){
  let user = req.body;
  User.create(user,function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/user/signin');
    }
  });
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