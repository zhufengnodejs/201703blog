//1.引入mongoose
let mongoose = require('mongoose');
//使用es6原生的Promise库替代掉mongoose使用的Promise库
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
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

exports.Article = conn.model('Article',new mongoose.Schema({
  title:String,//标题
  content:{type:String},//内容正文
  //外键 别的集合的主键 ref-reference引用
  author:{type:ObjectId,ref:'User'},
  category:{type:ObjectId,ref:'Category'},
  createAt:{type:Date,default:Date.now}//now不要加小括号，否则就变成一个永远固定的值了
}));