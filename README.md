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
直白来讲，Promise就是一种对执行结果不确定的一种预先定义，如果成功，就xxxx；如果失败，就xxxx，就像事先给出了一些承诺。他的思想是每一个异步任务返回一个Promise对象，该对象有个then方法，允许指定回调函数
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
## 11.http学习？  [详细参考地址](https://blog.csdn.net/qq_16546829/article/details/81165220)
首先要知道计算机网络的分层，大致两种分法  
 七层：物理层、链路层、网络层、传输层 、==会话层、表示层==、应用层   
 五层：物理层、链路层、网络层、传输层、 ----- 应用层  

### 物理层（“实体层”）
“实体层”，它就是把电脑连接起来的物理手段。它主要规定了网络的一些电气特性，作用是负责传送0和1的电信号。
### 链路层
1.链路层有个mac地址：  
以太网规定，连入网络的所有设备，都必须具有"网卡"接口。 数据包必须是从一块网卡，传送到另一块网卡。网卡的地址，就是数据包的发送地址和接收地址，这叫做MAC地址。每块网卡出厂的时候，都有一个全世界独一无二的MAC地址，长度是48个二进制位，通常用12个十六进制数表示前6个十六进制数是厂商编号，后6个是该厂商的网卡流水号。有了MAC地址，就可以定位网卡和数据包的路径了。  

2.使用“广播”的方式发送数据包    
"网络层"出现以后，每台计算机有了两种地址，一种是MAC地址，另一种是网络地址。两种地址之间没有任何联系，MAC地址是绑定在网卡上的，网络地址则是管理员分配的，它们只是随机组合在一起。网络地址帮助我们确定计算机所在的子网络，MAC地址则将数据包送到该子网络中的目标网卡。因此，从逻辑上可以推断，必定是先处理网络地址，然后再处理MAC地址。  

### 网络层
我们用分成四段的十进制数表示IP地址，从0.0.0.0一直到255.255.255.255。互联网上的每一台计算机，都会分配到一个IP地址。这个地址分成两个部分，前一部分代表网络，后一部分代表主机。但是，问题在于单单从IP地址，我们无法判断网络部分。这就要用到另一个参数"子网掩码"（subnet mask）。知道"子网掩码"，我们就能判断，任意两个IP地址是否处在同一个子网络。


### 传输层
"传输层"的功能，就是建立"端口到端口"的通信。

## HTTP协议中的短轮询、长轮询、长连接和短连接 [参考教程](http://web.jobbole.com/85541/)
HTTP协议是基于请求/响应模式的，因此只要服务端给了响应，本次HTTP连接就结束了，根本没有长连接短连接这一说。TCP连接是一个双向的通道，它是可以保持一段时间不关闭的，因此TCP连接才有真正的长连接和短连接这一说。长连接是指的TCP连接，而不是HTTP连接。  
### 第一个问题是，是不是只要设置Connection为keep-alive就算是长连接了？  
当然是的，但要服务器和客户端都设置。  
### 第二个问题是，我们平时用的是不是长连接？  
这个也毫无疑问，当然是的。（现在用的基本上都是HTTP1.1协议，你观察一下就会发现，基本上Connection都是keep-alive。而且HTTP协议文档上也提到了，HTTP1.1默认是长连接，也就是默认Connection的值就是keep-alive）  
长连接是为了复用，那既然长连接是指的TCP连接，也就是说复用的是TCP连接。【TCP协议能够确保数据不会遗失。它的缺点是过程复杂、实现困难、消耗较多的资源。】这里节省了tcp消耗
### 长短轮询和长短连接的区别
第一个区别是决定的方式，一个TCP连接是否为长连接，是通过设置HTTP的Connection Header来决定的，而且是需要两边都设置才有效。而一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。  
第二个区别就是实现的方式，连接的长短是通过协议来规定和实现的。而轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。 
## WebSocket 是什么？ [参考教程](https://www.cnblogs.com/jingmoxukong/p/7755643.html)
了解计算机网络协议的人，应该都知道：HTTP 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。  

这种通信模型有一个弊端：HTTP 协议无法实现服务器主动向客户端发起消息。  

WebSocket 就是这样发明的。WebSocket 连接允许客户端和服务器之间进行全双工通信，以便任一方都可以通过建立的连接将数据推送到另一端。WebSocket 只需要建立一次连接，就可以一直保持连接状态。这相比于轮询方式的不停建立连接显然效率要大大提高。
## react高阶组件？ [参考教程](https://segmentfault.com/a/1190000010371752)
高阶函数可以接受一个函数作为参数，返回值作为也是函数的函数。类似的 高阶组件也可以接受一个组件为参数，返回一个被加工过的组件。 

下面我们来实现一个最简单的高阶组件（函数），它接受一个React组件，包裹后然后返回
```
export default function withHeader(WrappedComponent) {
  return class HOC extends Component {
    render() {
      return <div>
        <div className="demo-header">
          我是标题
        </div>
        <WrappedComponent {...this.props}/>
      </div>
    }
  }
}


```
在其他组件里，我们引用这个高阶组件，用来强化它。
```
@withHeader
export default class Demo extends Component {
  render() {
    return (
      <div>
        我是一个普通组件
      </div>
    );
  }
}
```
## nvm？ [参考教程](https://www.jianshu.com/p/d0e0935b150a)
我们可能同时在进行2个项目，而2个不同的项目所使用的node版本又是不一样的，或者是要用更新的node版本进行试验和学习。这种情况下，对于维护多个版本的node将会是一件非常麻烦的事情，而nvm就是为解决这个问题而产生的，他可以方便的在同一台设备上进行 ***多个node版本之间切换***

## 关于nodejs [参考教程](https://www.cnblogs.com/snandy/p/3445550.html)
1.载入node_modules里的模块，用var mod = require('module_name')方式，如果模块名不是路径，也不是内置模块，Node将试图去当前目录的node_modules文件夹里搜索。如果当前目录的node_modules里没有找到，Node会从父目录的node_modules里搜索，这样递归下去直到根目录。

2.载入文件目录模块，可以直接require一个目录，假设有一个目录名为folder，如
var myMod = require('./folder')
此时，Node将搜索整个folder目录，Node会假设folder为一个包并试图找到包定义文件package.json。如果folder目录里没有包含package.json文件，Node会假设默认主文件为index.js，即会加载index.js。如果index.js也不存在，那么加载将失败。

## 关于异步处理，ES5的回调,ES6的Promise，ES7的async-await
1.ES6 promise详解 [参考教程](https://www.cnblogs.com/whybxy/p/7645578.html)  
  需要注意的是**链式操作的用法，all的用法，race的用法**
  ```
  // 和回调不同的是，这里可以直接使用链式调用
  runAsync1()
  .then(function(data){
      console.log(data);
      return runAsync2();
  })
  .then(function(data){
      console.log(data);
      return '直接返回数据';  //这里直接返回数据
  })
  .then(function(data){
      console.log(data);
  });
  
  
  // all方法并行执行异步操作的能力，原理是「谁跑的慢，以谁为准执行回调」
  Promise
  .all([runAsync1(), runAsync2(), runAsync3()])
  .then(function(results){
      console.log(results);
  });

  //  race方法与all相对，「谁跑的快，以谁为准执行回调」
  Promise
  .race([runAsync1(), runAsync2(), runAsync3()])
  .then(function(results){
      console.log(results);
  });
  ```
  2.ES7 async await [参考教程](https://segmentfault.com/a/1190000011526612?utm_source=tag-newest)  
   (1) async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。  
   (2) await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。  
   (3) 如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行  
   关于await的并行串行 [参考教程](https://www.cnblogs.com/leungUwah/p/7932912.html)
   
   ## 关于axios
   ### 1.axios里的baseURL和webpack里的 proxyTable有什么区别。
   这个用途不一样，
baseUrl会附加到你绑定的axios实例（如果是全局的，那就是所有实例）上，即如果get/post的url参数是相对路径（如） /api/c/xx，那就会执行 baseUrl + '/api/c/xx',如果未指定baseUrl，那就走浏览器地址栏里的base + baseUrl。
webpack里的proxyTable是测试环境为了避免浏览器下的跨域访问，而以nodejs代理成同前端页面（即浏览器地址栏）同域的一种处理。指定proxyTable后， axios就不需要指定baseUrl了。proxyTable会把base + '/api/c/xx'代理到【base baseUrl + '/api/c/xx'】的接口地址上。
当然工程发布时，后端和前端也需要发布到同一个域下。

## 关于es6语法
### Symbol 这是一种新的基础数据类型，它的功能类似于一种标识唯一性的ID
```
let s1 = Symbol()
let s2 = Symbol('another symbol')
let s3 = Symbol('another symbol')

s1 === s2 // false
s2 === s3 // false
```
### Set 类似数组，成员唯一，使用set去重 [...new Set(arr)]
```
var s=new Set([2,3,3,5])
s.add(4) // Set(4) {2, 3, 5, 4}

s.has(3) // true

s.delete(2) // true s变为Set(3) {3, 5, 4}

s.size // 3

s.clear() // 清空 Set(0) {}

```
### Map 类似对象，但键不限于字符串（传统对象，健值一定为字符串）
```
var a=new Map()

// a.set('健','值') 新增值
a.set('a',1111) // Map(1) {"a" => 1111}

// a.get('键') 获取值
a.get('a') // 1111

// 当键值为对象时，注意：对象不能直接写，需要赋值给变量才行

// bad
a.set(['dd'],1111)
a.get(['dd']) // undefined

// good
var dd=['dd']
a.set(dd,1111)
a.get(dd)

// a.keys() 获取所有的键值
// a.values() 获取所有的value值
```
