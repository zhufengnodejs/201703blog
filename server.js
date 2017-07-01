//加载express模块
let express = require('express');
let user = require('./routes/user');
//调用此方法返回app实例 app其实是一个
let app = express();
//中间件第一个参数是路径的前缀，
app.use('/user',user);
app.listen(8080);
