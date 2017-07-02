let express = require('express');
let {checkLogin} = require('../authware');
let {Article, Category} = require('../model');
let router = express.Router();
router.get('/add', checkLogin, function (req, res) {
  Category.find({}, function (err, categories) {
    res.render('article/add', {title: '增加文章', categories,article:{}});
  });
});
router.post('/add', checkLogin, function (req, res) {
  let article = req.body;
  article.author = req.session.user._id;
  Article.create(article, function (err, doc) {
    if (err) {
      res.back(err);
    } else {
      res.success('文章发表成功', '/');
    }
  });
});
router.get('/delete/:id', function (req, res) {
  let _id = req.params.id;
  Article.remove({_id},function(err,result){
    if(err){
      res.back(err.toString());
    }else{
      res.success('删除文章成功','/');
    }
  })
});
router.get('/detail/:id', function (req, res) {
  let id = req.params.id;
  Article.findById(id).populate('category').exec(function (err, article) {
    res.render('article/detail',{title:'文章详情',article})
  });
});
router.get('/update/:id',function(req,res){
  let id = req.params.id;
  Category.find({},function(err,categories){
    Article.findById(id,function(err,article){
      if (err)
        return res.back(err)
      res.render('article/add',{title:'更新文章',article,categories});
    })
  });
});
router.post('/update/:id',function(req,res){
  let article = req.body;
  let _id = req.params.id;
  Article.update({_id},article,function(err,result){
    if(err)
      return res.back(err);
    res.success('更新文章成功22',`/article/detail/${_id}`);
  });
});
module.exports = router;