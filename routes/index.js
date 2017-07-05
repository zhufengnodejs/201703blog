let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function(req,res){
  //populate一个字段表示把一个字段从ID转成对象
  //author外键是一个字段串，
  let {keyword,pageNum,pageSize} = req.query;
  pageNum = isNaN(pageNum)?1:parseInt(pageNum);//当前页码
  pageSize = isNaN(pageSize)?3:parseInt(pageSize);//每页的条数
  let query = {};
  if(keyword){
    query.title = new RegExp(keyword);
  }
  //count获取指定条件的记录总数
  Article.count(query,function(err,count){
    Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('author').exec(function(err,articles){
      res.render('index',{
        title:'首页',
        keyword,
        totalPage:Math.ceil(count/pageSize),
        pageNum,
        pageSize,
        articles});
    });
  })

});
module.exports = router;