//加载express模块
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let user = require('./routes/user');
let category = require('./routes/category');
let article = require('./routes/article');
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
  secret:'zfpx'//加密cookie的秘钥
}));
/**
 * ？ 如何控制页面上的菜单显示
 * 1. 当登录成功之后，会把查询到的当前用户对象保存到会话对象中 req.session
 * 2. 在渲染其它页面时，先把会话对象(req.session)中的user属性取出来赋给了res.locals(真正渲染模板的数据对象).
 * .在模板里就可以通过user有没有值来控制 菜单的显示 。
 */
app.use(function(req,res,next){
  // res.locals 是真正渲染模板的数据对象
 res.locals.user = req.session.user;
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
//中间件第一个参数是路径的前缀，
app.use('/user',user);
//如果访问的路径是以/category开头的
app.use('/category',category);
//如果访问的路径是以/article开头的
app.use('/article',article);
app.listen(8080);
