//加载express模块
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
//flash 闪电 一闪而过
let flash = require('connect-flash');
let user = require('./routes/user');
let category = require('./routes/category');
let article = require('./routes/article');
let index = require('./routes/index');
let path = require('path');
//调用此方法返回app实例 app其实是一个
let app = express();
//引入body-parser中间件后会往请求对象上增加一个body属性
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//使用会话中间件
app.use(session({
  resave:true,//每次请求结束重新保存session
  saveUninitialized:true,//保存未初始化的session
  secret:'zfpx',//加密cookie的秘钥
  //指定session数据的存放位置，可能是内存、文件系统、数据库
  store:new MongoStore({url:'mongodb://127.0.0.1/201703blog'})
}));
//所有的中间件都是一个函数，所以都需要执行一下再放到use里
app.use(flash());
//使用此中间件之后 req.flash();
// req.flash(type,msg) 二个参数写入一条消息
// req.flash(type) 一个参数表示读取一条消息
/**
 * ？ 如何控制页面上的菜单显示
 * 1. 当登录成功之后，会把查询到的当前用户对象保存到会话对象中 req.session
 * 2. 在渲染其它页面时，先把会话对象(req.session)中的user属性取出来赋给了res.locals(真正渲染模板的数据对象).
 * .在模板里就可以通过user有没有值来控制 菜单的显示 。
 */
app.use(function(req,res,next){
  // res.locals 是真正渲染模板的数据对象
 res.locals.user = req.session.user;
 res.locals.success = req.flash('success').toString();
 res.locals.error = req.flash('error').toString();
 next();
});
app.use(function(req,res,next){
  res.success = function(msg,url){
    req.flash('success',msg);
    res.redirect(url);
  }
  res.error = function(err,url){
    req.flash('error',err);
    res.redirect(url);
  }
  res.back = function(err){
    res.error(err,'back');
  }
  next();
});
//设置模板引擎
app.set('view engine','html');
//模板的存放路径
app.set('views',path.resolve('views'));
//设置如果模板是html的话，使用ejs引擎的渲染方法来进行渲染
app.engine('html',require('ejs').__express);
//把项目根目录下面的node_modules作为静态文件根目录
app.use(express.static('node_modules'));
app.use(express.static('public'));
//index是一个中间件函数，当服务器收到客户端的请求的时候，会判断前缀，如果前缀匹配，会将将由交给此中间件函数来处理
app.use('/',index);
//中间件第一个参数是路径的前缀，
app.use('/user',user);
//如果访问的路径是以/category开头的
app.use('/category',category);
//如果访问的路径是以/article开头的
app.use('/article',article);
app.listen(8080);
