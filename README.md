# online-chat

## 项目介绍
```
日常学习⽣活中，我们离不开聊天软件。⽆论是微信、QQ，还是抖⾳、头条，亦或是未来⼯作中会⽤到的⻜书、企业微信、钉钉，都集成了聊天功能。但是，好像在⽹⻚上也能够实现聊天功能，所以我们就来⾃⼰⽤⽹⻚实现⼀个聊天功能！
```

## 技术栈
```
主要技术: vue(vue-cli、vue-router、vuex)、nodejs、axios
辅助工具: jQuery、less、iconfont阿里巴巴图标库
```

## 文件介绍
- server 文件夹为项目的服务端,使用nodejs编写
  - head-images 文件夹为用户上传头像的图片存储目录
  - expression-images 文件夹为用户上传表情包的图片存储目录
  - router 文件夹中存放 express 框架中的路由
  - ultis 文件夹存放 mysql 的配置文件
  - server.js 搭建了一个基于 express 框架的服务器
- mysql 文件夹为项目使用到的 mysql 数据库关于表的初始化的sql文件
- dist 文件夹为webpack打包后的项目
- src 文件夹是项目开发时的相关文件
  - asseets 中存放 iconfont 相关的 js 文件与一些美化的图片资源
  - components 为 vue 可复用的组件
  - router 为 vue-router 的前端路由
  - store 与 vuex 相关

## Project运行的环境要求
```
npm、nodejs、mysql的安装
```

## Project初始化
1. 在根目录使用命令 npm install 或者 npm install –save-dev 将项目所使用的依赖文件安装到 node_modules 目录中
2. cd 到 server 文件夹,在 server 文件夹中使用命令 npm install 或者 npm install –save-dev 将项目服务器所使用的依赖文件安装到 server 文件夹下的 node_modules 中
3. 在 mysql 中建立一个名为 my_test_db 的 database,并使用 mysql 文件夹下的.sql文件建立相应的数据库表, 可以在 ./server/ultis/mysql.js 中相应位置修改 database 的名字


## development模式下的编译和运行
```
1. 先在一个终端中在 ./server 目录下使用 node server.js 命令开启服务器 
2. 新建另一个终端, 使用命令 npm run serve 在development模式运行项目(第一步的终端不可关闭)
```

## production模式下的编译和运行
```
0. production模式下的文件不能直接通过vscode开启服务访问，会报错, 需要提前安装serve, 命令为 npm install serve -S -g(若已安装可跳过)
1. 先在一个终端中在 ./server 目录下使用 node server.js 命令开启服务器 
2. 新建另一个终端, 使用命令 serve dist 运行项目(第一步的终端不可关闭)

Tips: 已将development模式下的项目打包至 dist 文件夹, 若更改了development模式下的代码, 可通过 npm run build 命令重新打包
```

## 基本功能概述
- 用户可以通过Web端注册/登录
  - Web端的注册和登录采用了jwt认证机制，客户端提交账号与密码后，服务器将生成的token发送给客户端，客户端再次发起请求时，将token放入请求头的Authorization字段，服务器解析token后即可将对应该用户的内容响应给浏览器
  - 对用户的密码进行了bcrypt加密，数据库中存储的是密文，密码验证时是将用户输入的密码通过同一个密钥加密后再与数据库中存储的密文进行比对，不涉及明文。因此，即使是数据库拥有者也无法冒充用户登录账号，更具安全性
- 用户可以设置昵称/头像/签名
- 用户可以通过用户ID添加好友
- 用户可以快速检索自己已经添加过的好友
- 用户可以进⾏⽂字聊天
- 用户可以使⽤系统提供的默认表情进⾏聊天
- 用户可以看到对⽅是否已经查看了消息
- 用户可以看到历史聊天记录
- 用户可以删除/屏蔽联系⼈
- 用户可以编辑聊天背景颜色、字体样式(包括字号、加粗、下划线、斜体、颜色)
- 用户可以自行上传头像
- 用户可以看见好友是否在线(未完善）
- 系统可以自动过滤掉⻩暴信息(未完善）

# 补充

### 用户可以看见好友是否在线
```
在实现此功能时，我们完成的工作：
1、用户登录后立即将登录状态改为在线并通知其他用户进行相应样式的更改
2、用户手动注销退出登录后立即将登录状态改为离线并通知其他用户进行相应样式的更改

仍存在的问题：
1、无法监听“用户直接点击浏览器上方的tab栏中的叉号或右上角的叉号直接关闭网页”
针对问题做出的尝试：监听window的beforeunload事件或visibilitychange事件，皆无法监听直接关闭网页的行为，使用的浏览器为Google，相关代码在 ./src/router/GlobalContainer.vue中的34-54行。
```

### 系统可以自动过滤掉⻩暴信息
```
对该问题我们仅有一个十分naive的想法，即在服务器端事先给出相关的敏感词或敏感词的正则，利用较为高效的Aho–Corasick算法将检测到的词汇替换为**，但是我们缺乏敏感词，仅检测了 ['fuck', '黄', '暴'] 中的词汇。
```


### 联系方式
QQ：1303878755

Email: zxtreme@qq.com

微信号: z1303878755 

若有读者发现项目中潜在的问题或能够解决项目中已有的问题，欢迎与作者联系，万分感激。
