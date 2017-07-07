# 汪汪汪
内含签到，上传下载等功能
大致三个步骤 
**环境配置、install安装、forever后台运行、**
其中forever后台运行非必需配置，需要常驻后台的童鞋可以尝试

## 环境配置

程序由nodejs编写 以下搬运自猴子也能看得懂的度熊🐻
>1、windows下的NodeJS安装是比较方便的（v0.6.0版本之后，支持windows native），只需要登陆官网（http://nodejs.org）
，便可以看到首页的“INSTALL”按钮，直接点击就会自动下载安装了。

>2、安装过程基本直接“NEXT”就可以了。（windows的安装msi文件在过程中会直接添加path的系统变量，变量值是你的安装路径，例如“C:\Program Files\nodejs”）。

>3、安装完成后可以使用cmd（win+r然后输入cmd进入）测试下是否安装成功。方法：在cmd下输入
**node -v** ，出现版本提示就是完成了NodeJS的安装。

>4、npm的安装。由于新版的NodeJS已经集成了npm，所以之前npm也一并安装好了。同样可以使用cmd命令行输入"npm -v"来测试是否成功安装。出现版本提示便OK了。

也可以在这里查看更多 http://www.runoob.com/nodejs/nodejs-install-setup.html


## install安装

nodejs引用描述包的文件是**package.json**文件.
npm安装package.json时  直接转到当前项目目录下用命令
**npm install** 
或
**npm install --save-dev**安装即可，自动将package.json中的模块安装到node-modules文件夹下（本地）

## forever后台运行
 nodejs一般是当成一条用户命令执行的，当用户断开客户连接，运用也就停了，很烦人。如何让nodejs应用当成服务，在后台执行呢？

最简单的办法：

        $ nohup node app.js &
但是，forever能做更多的事情，比如分别记录输出和错误日志，比如可以在js中作为api使用。

        $ sudo npm install forever -g   #安装
        $ forever start app.js          #启动
        $ forever stop app.js           #关闭
        $ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误

命令语法及使用 https://github.com/nodejitsu/forever

## Staff
发生八阿哥什么的别慌，联系本人解决

## PS:
mac地址什么的都是写死到代码里面的，**/servers/task.js**中修改即可
