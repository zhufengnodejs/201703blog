# 珠峰博客
## 初始化项目
```
npm init -y
```
## 安装依赖的模块
```
npm install express body-parser bootstrap connect-flash connect-mongo debug ejs express-session mongoose multer -S
```

## 配置路由
### 用户管理
- 用户注册
- 用户登录
- 用户退出

### 文章分类管理
- 创建分类
- 分类列表
- 删除分类

### 文章管理
- 创建文章
- 修改文章
- 删除文章
- 查询文章
- 评论文章

##　实现路由
### 用户路由
```
/user/signup 注册
/user/signin 登录
/user/signout 退出
```
### 文章分类路由
```
/category/list 分类列表
/category/add 增加分类
/category/delete/:id 删除分类
```
### 文章路由
```
/article/add 增加文章
/article/delete/:id 删除文章
```

##