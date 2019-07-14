# webpack
1.拿到项目后，第一步是使用npm包管理工具将其管理 npm init -y

2.再创建 src 和 dist文件夹

3.src下创建index.html main.js（这是项目js入口文件）

4.在使用webpack命名打包 webpack .\src\main.js -o .\dist\bundle.js



# webpack 作用
1.webpack 能够处理js文件之间的互相依赖关系

2.webpack 能够处理js的兼容问题，将浏览器不能识别的高级语法识别为低级语法

# webpack-dev-server 工具
实现自动打包编译的功能

0.先在项目根目录下新建 webpack.config.js

1. 运行npm i webpack-dev-server -D  （项目安装） 把这个工具安装到项目的本地开发依赖

2. 安装完毕后，用法和webpack用法一样

3. 由于，我们在项目中，本地安装的，无法把他当做脚本命令，在终端中，无法直接运行，只有安装到 全局 -g 的工具，才能在终端中正常执行

4. webpack-dev-server 运行，要求，在本地项目里安装webpack

5. webpack-dev-server帮我们打包生成的bundle.js并没有存放到实际的物理内存上，而是直接托管到了 电脑内存中。

6. webpack-dev-server 把打包好的文件，以虚拟的形式托管到 项目中，让我们看不到，但可以认为，和dist src 平级，有一个看不见的文件

# npm i html-webpack-plugin -D
npm run dev
webpack插件，作用是生成内存中的首页
1. 自动在内存中根据页面生成一个内存的页面
2. 自动，将打包好的 bundle.js 追加到页面中去

# npm i url-loader file-loader -D
默认情况下，webpack无法处理 css文件里的url地址，不管是图片还是字体库，只要是url，都处理不了

# npm i babel-core babel-loader babel-plugin-transform-runtime -D
# npm i babel-preset-env babel-preset-stage-0 -D
通过 Babel 可以将高级语法转化为低级语法
1.在webpack中，运行两套命令，安装两套包，去安装Babel相关的loader功能
2.打开webpack配置文件，在module节点的rules数组中，添加一个新的匹配规则：
2.1 {test:/\.js$/,use:'babel-loader','exclude:/node_modules/'}
2.2 注意：在配置babel规则的时候，要把node_modules目录通过exclude排除掉，如果不排除，则babel会将node_modules中所有第三方js文件都打包编译，这样会非常消耗cpu，
3. 在项目的根目录中，新建一个叫做 .babelrc 的babel配置文件，这个配置文件，属于JSON格式，所以在写 .babelrc 配置的时候必须符合JSOn规范，不能写注释，字符串必须要用双引号
3.1 在babel写如下配置
{
    "presets":["env","stage-0"],   //语法的意思
    "plugins":["transform-runtime"]
}

# 解析 .vue 文件
总结：在webpack中如何使用vue

1.安装vue包 npm i vue -s

2.由于在webpack中推荐使用 .vue模板文件定义组件，所以需要安装能解析这种文件的loader
安装命令 npm i vue-loader vue-template-compiler -D
3. 在main.js导入vue模块  import Vue from 'vue'

4. 定义一个 .vue 结尾的组件，组件以三个部分组成 <template></template> <style></style> <script></script>

5. 使用 import 导入这个组件 import login from './login.vue'

6. 在webpack.config.js中配置解析.vue文件的loader 

    6.1 const VueLoaderPlugin = require('vue-loader/lib/plugin')

    6.2 module.exports = {
            plugins:[
                new VueLoaderPlugin()
            ]
        }

7. 创建 vm 实例 var vm = new Vue({el:'#app,render:c=>c(login)})

8. 在页面创建id为app的div元素，作为vm要控制的区域

# .vue 组件的data等
var 名称 = require('模块标识符')
module.export = {}  是Node 向外暴露成员的形式

在ES6导入模块中，使用 import 模块名称 from '模块标识符'  import '表示路径'
在ES6中 使用 export default 和export 向外暴露成员
向外暴露的成员，可以使用任何变量接受
在一个模块中，export default 只允许向外暴露一次
在一个模块中，可以同时使用 export default 和 export
使用export暴露方法
```js
//使用export暴露的成员可以暴露多个成员，如果某些成员在import的时候不需要，则可不在{}定义即可
export var title = '小星星'
export var title2 = '小星星2'
```
使用export导入方法
```js
// 使用export暴露的成员，只能使用{}的形式来接受，这种形式叫做 按需导出
// 注意必须严格按照导出时候的名称来接收，但是可以使用 as 来气别名
import {title，title2 as xxx} from './test.js'
```

# webpack 路由
0.安装vue-router 包    npm i vue-router -s
1.手动安装 VueRouter   Vue.use(VueRouter)
2.导入vue-router 包    import VueRouter form 'vue-router'
3.创建路由对象
```js
var router = new VueRouter({
  routes:[
    {path:'/',component:account},
    {path:'/account',component:account},
    {path:'/goodList',component:goodList},
  ]
})


var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router:router
})
```

# 将 路由 从 main.js 中抽离为路由模块
1.先创建一个 router.js 文件
2.将设计路由的放入 router.js 中
```js
import VueRouter from 'vue-router'
import account from './main/account.vue'
import goodList from './main/goodList.vue'
import login from './subcom/login.vue'
import register from './subcom/register.vue'
var router = new VueRouter({
    routes:[
      {
        path:'/account',
        component:account,
        children:[
          {path:'login',component:login},
          {path:'register',component:register}
        ]
      },
      {path:'/goodList',component:goodList},
    ]
  })
```
3.然后导出
```js
 export default router
```
4.在 main.js 中导入
```js
//导入 自定义路由模块
import router from './router.js'
```