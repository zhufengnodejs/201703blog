let express = require('express');
let {Category} = require('../model');
let router = express.Router();
router.get('/list',function(req,res){
  Category.find({},function(err,categories){
    res.render('category/list',{title:'分类管理',categories});
  });
});
router.get('/add',function(req,res){
  res.render('category/add',{title:'添加分类'});
});
router.post('/add',function(req,res){
  let category = req.body;
  Category.findOne(category,function(err,oldCategory){
    if(err){
      res.back(err);
    }else{
      if(oldCategory){
        res.back('分类名称已经存在，请换个名称吧');
      }else{
        Category.create(category,function(err,doc){
          if(err){
            res.back(err);
          }else{
            res.success('分类添加成功','/category/list');
          }
        })
      }
    }
  })
});
router.get('/delete/:id',function(req,res){
  res.send('删除分类');
});
module.exports = router;