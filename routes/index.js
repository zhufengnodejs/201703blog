let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function(req,res){
  //populate一个字段表示把一个字段从ID转成对象
  //author外键是一个字段串，
  let {keyword} = req.query;
  let query = {};
  if(keyword){
    query.title = new RegExp(keyword);
  }
  Article.find(query).populate('author').exec(function(err,articles){
    res.render('index',{
      title:'首页',
      keyword,
      articles});
  });
});
module.exports = router;