//加载express模块
let express = require('express');
let user = require('./routes/user');
let category = require('./routes/category');
let article = require('./routes/article');
let path = require('path');
//调用此方法返回app实例 app其实是一个
let app = express();
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
