//1.引入mongoose
let mongoose = require('mongoose');
//2.连接数据库
mongoose.connect('mongodb://127.0.0.1/201703blog');
//3.定义schema
//4.定义model
exports.User = mongoose.model('User', new mongoose.Schema({
  username: String,//用户名
  password: String,//密码
  email: String,//邮箱
  avatar: String//头像
}));