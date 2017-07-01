let express = require('express');
let {User} = require('../model');
//Router是一个方法，调用此方法会返回一个路由中间件的实例
let router = express.Router();
//当客户端以GET方法访问 /user/signup路径的时候会执行此路由函数
router.get('/signup',function(req,res){
  //渲染views目录下面的signup模板
  res.render('user/signup',{title:'用户注册'});
});
router.post('/signup',function(req,res){
  let user = req.body;
  User.create(user,function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      res.redirect('/user/signin');
    }
  });
});
router.get('/signin',function(req,res){
  res.render('user/signin',{title:'用户登录'});
});
router.get('/signout',function(req,res){
  res.send('退出');
});
//一定要先行导出此路由中间件
module.exports = router;