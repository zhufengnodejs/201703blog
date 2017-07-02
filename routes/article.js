let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/add', function (req, res) {
  res.render('article/add', {title: '增加文章'});
});
router.post('/add', function (req, res) {
  let article = req.body;
  Article.create(article,function(err,doc){
     if(err){
       res.back(err);
     }else{
       res.success('文章发表成功','/');
     }
  });
});
router.get('/delete/:id', function (req, res) {
  res.send('删除文章');
});
module.exports = router;