# **学习loading。。。**
## 1.action是什么？
Action 是一个普通 javascript对象，它是改变 State 的唯一途径，来源于用户与views的交互行为，改变state

## 2.Dispatcher是什么？
提供了把Action分发给Store的机制，dispatcher根据action type调用对应的回调函数，dipatch 可以看作是触发action行为的方式，而 Reducer 则是描述如何改变数据的

## 3.单页面应用的好处？
页面片段局部刷新，用户体验更好，尤其是移动设备上，开发难度比多页面应用高点（需要专门的框架来降低难度），页面资源共享比较容易、（不像多页面应用，依赖localStorage，url，cookie等实现麻烦）,单页面应用已经是web开发的潮流

## 4.git的tag作用？

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

