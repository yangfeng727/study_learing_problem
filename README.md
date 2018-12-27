# **学习loading。。。**
## 1.action是什么？
Action 是一个普通 javascript对象，它是改变 State 的唯一途径，来源于用户与views的交互行为，改变state

## 2.Dispatcher是什么？
提供了把Action分发给Store的机制，dispatcher根据action type调用对应的回调函数，dipatch 可以看作是触发action行为的方式，而 Reducer 则是描述如何改变数据的

## 3.单页面应用的好处？
页面片段局部刷新，用户体验更好，尤其是移动设备上，开发难度比多页面应用高点（需要专门的框架来降低难度），页面资源共享比较容易、（不像多页面应用，依赖localStorage，url，cookie等实现麻烦）,单页面应用已经是web开发的潮流

## 4.git的tag作用？
使用git 创建一个tag ,这样一个“不可修改”的历史代码版本就像被我们封存起来一样,不论是运维发布拉取,或者以后的代码版本管理,都是十分方便的，这和分支不一样
## 5.promise对象？
他的思想是每一个异步任务返回一个Promise对象，该对象有个then方法，允许指定回调函数
               比如，f1的回调函数f2,可以写成：f1().then(f2);

                function f1(){

                　　　　var dfd = $.Deferred();

                　　　　setTimeout(function () {

                　　　　　　// f1的任务代码

                　　　　　　dfd.resolve();

                　　　　}, 500);

                　　　　return dfd.promise;

                　　}
 ## 6.componentDidUpdate？
 组件更新结束之后执行，在初始化render时不执行
## 7.nodejs升级1.安装nvm
## 8.react路由：
    （1）react路由用的switch,switch是用于判断在Route里面设置的地址，进入子页面使用
    （2）Link点击的路由地址，跳转到页面上Route组件的位置
## 9.HTTP与HTTPS的区别：
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息，HTTP协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此，HTTP协议不适合传输一些敏感信息。  
为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS，为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。  
HTTPS和HTTP的区别主要如下：

　　1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

　　2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

　　3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

　　4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
## 10.webpack 里的chunk是什么意思？  
指的打包后的代码块的意思，chunkname就是打包后代码的名字。  
