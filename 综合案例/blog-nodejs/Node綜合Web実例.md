# Node 綜合 Web 実例

### 1.目次構造

```
.
|—— app.js
|—— controllers
|—— models
|—— node_modules
|—— package.json
|—— package-lock.json
|—— public
|—— READ.md
|—— routes
|—— views     
```

### 2.template page

### 3. ルーター　デザイン

| path | method | get para | post para | isLogin | メモ |
| ---- | ------ | -------- | --------- | ------- | ---- |
| /    | GET    |          |           |         |  render hp    |
| /register    | GET    |          |           |         |  render register     |
| /register    | POST    |          | email,name,password         |         | 处理注册请求    |
| /login    | GET    |          |           |         | 渲染登陆页面    |
| /login    | POST    |          | email,password          |         | 处理登陆请求     |
| /logout    | GET    |          |           |         | 处理退出请求     |







