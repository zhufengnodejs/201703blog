//1.引入mongoose
let mongoose = require('mongoose');
//2.连接数据库
//conn是连接对象
let conn = mongoose.createConnection('mongodb://127.0.0.1/201703blog');
//3.定义schema
//4.定义model
//如果不通过collection给定user,那么集合名称=模型名->小写(user)->复数(users)
exports.User = conn.model('User', new mongoose.Schema({
  username: String,//用户名
  password: String,//密码
  email: String,//邮箱
  avatar: String//头像
}));

exports.Category = conn.model('Category',new mongoose.Schema({
  name:String // 分类名称 类型是字符串
}));