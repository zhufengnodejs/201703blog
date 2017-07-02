let express = require('express');
let router = express.Router();
router.get('/list',function(req,res){
  res.render('category/list',{title:'分类管理'});
});
router.get('/add',function(req,res){
  res.send('添加分类');
});
router.get('/delete/:id',function(req,res){
  res.send('删除分类');
});
module.exports = router;