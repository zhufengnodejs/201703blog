let express = require('express');
let router = express.Router();
router.get('/add',function(req,res){
  res.send('增加文章');
});
router.get('/delete/:id',function(req,res){
  res.send('删除文章');
});
module.exports = router;