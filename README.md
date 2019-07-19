# 这是一个基于 Vue 开发并使用webpack打包

# `Vue 结合webpack开发基本思路`

# 前期准备
准备好webpack等配置，在项目里安装需要的 包
>安装命令 npm i

# 手机调试
- 在手机里调试运行
- 要先保证 手机 和 开发电脑 处于同一个wifi环境下，也就是说手机可以访问到电脑ip 
- 打开自己项目中的 package.json 文件，在 dev 脚本中添加一个 --host 指令，把当前 电脑的wifi 的 ip地址设置为 --host 的指令值
- 在cmd终端运行 'ipconfig' 查看 无线网 IP地址
- >配置package.json 
```js
"scripts": {
    "dev": "webpack-dev-server --open --contentBase --hot --host 192.168.43.38"
},
```

# 准备git
先在项目目录 初始化 .git
> 初始化    git init

> 查看文件状态  git status

> 将文件加入暂存区    git add .

> 提交的信息    git commit -m "init my project"

> 将文件从本地暂存区提交到远程仓库  git push


# vuex
- 是 Vue 配套的公共数据管理工具，它可以把一些共享的数据，保存在 vuex 中，方便整个程序在任何组件中直接获取或修改我们的公共数据
- 共享的数据可以放入 vuex 中，组件私有数据放入组件data中即可
- props(存放父组件数据)  data(存放组件私有数据)  vuex(存放组件全局共享数据)
- 1.vuex 安装方式
    1. 直接下载 / CDN 引用（在 Vue 之后引入 vuex 会进行自动安装：）
    ```html
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vuex.js"></script>
    ```
    2. NPM
    - ```node
      npm install vuex --save
      ```
    - 在一个模块化的打包系统中，您必须显式地通过 Vue.use() 来安装 Vuex：(当使用全局 script 标签引用 Vuex 时，不需要以上安装过程)
        ```js
        import Vue from 'vue'
        import Vuex from 'vuex'

        Vue.use(Vuex)
        ```
- 2.vuex 安装好后，在main.js导入包
```js
import Vuex from 'vuex'
```

- 3.注册vuex到Vue中
```js
Vue.use(Vuex)
```

- 4.new Vuex.story 实例，得到数据仓储对象
```js
var store = new Vuex.Store({
    state:{
        //可以把这个当做组件中的data，专门来存储数据
    },
    mutations:{
        //
    }
})
```

- 5.将 实例 挂载到vm身上，就能全局访问来存取数据
```js
var vm = new Vue({
    el:'#app',
    render: c => c(app),
    //挂载路由对象到app上
    router:router,
    //将 vuex实例 挂载到vm实例上
    store:store
})
```

- 6.在组件中获取store中的数据，只能通过 this.$store.state.*
> this.$store.state.*

- 7.操作 store 中的state值，只能通过调用 `mutations` 提供的方法，才能操作对应的数据，不推荐直接操作state中的数据，因为可能会导致数据的紊乱，不能快速定位错误的原因，因为每个组件都有单独的操作数据的方法
```js
var store = new Vuex.store({
    state:{
        //可以把这个当做组件中的data，专门来存储数据
        count:0
    },
    mutations:{
        //第一个参数永远是 state
        increment(state){
            state.count++
        }
    }
})
```

- 8.子组件调用mutations的方法
> this.$store.commit('方法名')

- 9.传参方法`(最多传2个参数，一个为state，还有一个可以为对象，数组等)`
    - 先在mutations的方法里设置第二个参数
    ```js
    var store = new Vuex.store({
        state:{
            //可以把这个当做组件中的data，专门来存储数据
            count:0
        },
        mutations:{
            //第一个参数永远是 state
            increment(state,num){
                state.count += num
            }
        }
    })
    ```
    - 在调用时传入参数
    ```js   
    this.$store.commit('increment',2)
    ```
- 10.getter属性 作用`在对外提供数据时，需要做一层包装，那么使用getters，对外提供数据，不能修改数据`
```js
var store = new Vuex.store({
    state:{
        //可以把这个当做组件中的data，专门来存储数据
    },
    mutations:{

    },
    getters:{
        optCount:function(state){
            return '当前最新的count值：' + state.count
        }
    }
})
```
- 组件中获取getters方式
```html
<h3>{{$store.getters.opCount}}</h3>
```

# 编写代码

## 页面分析
页面主要一个根模板，根模板分为三个区域
* 头部header
* 中间 路由 router-view
* 底部Tabbar区域

通过底部Tabbar来切换路由组件

所以首页index就放一个app.vue作为根路由
```
<router-view></router-view>
在跟路由下放置4个子路由组件模块
```
```html
<div id="app">
    <router-view></router-view>
</div>
```

```js
// 入口文件
import Vue from 'vue'

// 导入 app 根组件
import app from './app.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app)
})
```

app.vue根组件的基本布局
```html
<template>
    <div id="mainbv">
        <!--顶部header-->
        <mt-header fixed title="黄即吧"></mt-header>
        123
        <!--中间 路由 router-view-->

        <!--底部Tabbar区域-->
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
    </div>
</template>

<script>

</script>

<style scoped>
    #mainbv{
        padding-top: 50px;
        padding-bottom: 50px;
    }
</style>
```

## app.vue 以及 main.js的一些配置代码
1. 首先首页的头部header用到了Mint-UI的组件，在main.js中
```js
mport 'mint-ui/src/style/empty.css'
// 按需导入 Mint-UI 组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)
```
在app.vue 中
```html
<mt-header fixed title="黄即吧"></mt-header>
```

2.中间为为路由组件要渲染的坑
```html
<router-view></router-view>
```

3.底部tabbar，使用的是MUI组件
```js
// 导入mui样式
import './lib/mui/css/mui.css'
// 导入mui扩展样式
import './lib/mui/css/icons-extra.css'
```

4.修改tabbar，变成符合我们的路由链接
```html
<nav class="mui-bar mui-bar-tab">
	<router-link class="mui-tab-item" to="/home">
		<span class="mui-icon mui-icon-home"></span>
		<span class="mui-tab-label">首页</span>
	</router-link>
	<router-link class="mui-tab-item" to="/member">
		<span class="mui-icon mui-icon-contact"></span>
		<span class="mui-tab-label">会员</span>
	</router-link>
	<router-link class="mui-tab-item" to="/shopcar">
		<span class="mui-icon mui-icon-extrmui-icon-extra-cart"><span class="mui-badge">0</span>span>
		<span class="mui-tab-label">购物车</span>
	</router-link>
	<router-link class="mui-tab-item" to="/search">
		<span class="mui-icon mui-icon-search"></span>
		<span class="mui-tab-label">搜索</span>
	</router-link>
</nav>
```


## 路由模块
在src目录下新建一个router.js作为路由模块
```js
import VueRouter from 'vue-router'


var router = new VueRouter({
    routes:[
      ],
      linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认类叫做 router-link-active
  })

  export default router
```
在main.js的配置
```js
//导入路由
import VueRouter from 'vue-router'
//启用路由
Vue.use(VueRouter)
//1.3 导入自己的router.js模块
import router from './router.js'
```

##  点击tabbar展示对应的路由组件
创建tabbar的四个子组件
然后在 router.js 中导入对应的路由组件
```js
import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
```
然后定义 router 路由规则
```js
var router = new VueRouter({
    routes:[
        {path:'/',component:homeContainer},
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/search',component:searchContainer},
        {path:'/shopcar',component:shopcarContainer},

      ],
      linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认类叫做 router-link-active
  })
```

## home.vue 组件的制作

### 轮播图制作
1. 轮播图取自 MintUI 所以要先在 mian.js 中按需导入,并在Vue中注册
```js
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
```
2. 获取轮播图数据
使用 Vue-resource
> 安装Vue-resource  npm i vue-resource -s
然后在main中导入
```js
//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 Vue-resource
Vue.use(VueResource)
```
2.1 在组件里使用vue-resource获取数据   `this.$http.get('url').then(回调函数)`
在 created 的时候调用，将获取到得数据，要保存到data 上
```js
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                LuBotuList:[]
            }
        },
        created(){
            this.getLunBotu()
        },
        methods: {
            //轮播图获取数据的方法
            getLunBotu(){
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                   console.log(result.body)
                   if(result.body.status === 0){
                        this.LuBotuList = result.body.message;
                    } else{
                        Toast('获取；轮播图加载失败')
                    }
                })
            }   
        }
    }
```
2.2 获取到数据后，通过v-for渲染出图片
```html
<!--轮播图-->
<mt-swipe :auto="4000">
    <mt-swipe-item v-for="item in LuBotuList" :key="item.url">
        <img :src="item.img">
    </mt-swipe-item>
</mt-swipe>
```
### home页六宫格制作
从MUI中获取类似的组件，并修改

### 六宫格里改造 
路由链接`<router-link to="/home/newsList"></router-link>`跳转相应模块

## 新闻资讯页面制作
### 绘制页面
使用MUI中的 media-list.html
### 使用 vue-resource 获取数据

### 渲染数据

### 时间格式的过滤
在 main.js 中 定义全局的过滤器

过滤器里的处理函数可以找现成的
> npm i moment -s
```js
//导入时间插件
import moment from 'moment'
```
```js
//定义过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
```
最后放入要过滤的地方
```html
<span>发表时间：{{newlitem.add_time | dateFormat }}</span>
```

## 新闻资讯详情页

### 实现新闻列表点击跳转新闻详情
- 将新闻列表每一项改造为 router-link，在跳转的时候，传递唯一的id标识
- 创建新闻详情的新闻页面   newsInfo.vue
- 在路由模块router.vue中，将新闻详情的路由地址和组件页面对应起来
```js
import newsInfo from './components/news/newsInfo.vue'

var router = new VueRouter({
    routes:[
        {path:'/home/newsInfo/:id',component:newsInfo}
      ]
  })
```
- 新闻详情页得到传递值的方法

将url地址传递过来的id值，挂载到data上，方便调用
```js
export default {
    data(){
        return{
            id:this.$route.params.id
        }
    }
}
```

### 实现数据渲染
获取数据，并保存至data中
```js
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        //获取新闻详情
        getNewsInfo(){
            this.$http.get('api/getnew/'+ this.id).then(result => {
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0];
                    console.log(this.newsInfo)
                } else{
                    Toast("获取新闻失败！")
                }
            })
        }
    },
}
```

将data里的数据渲染至页面
```html
<div class="newsInfo-contain">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
        <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
        <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr/>
    <div class="content" v-html="newsInfo.content"></div>
</div>
```

## 评论子组件
- 单独封装一个 comment.vue 组件模板
- 在需要使用coment组件的页面，先手动导入comment组件
    - import comment from '路径' 
- 在父组件中，使用 component 属性，将刚才导入的 comment组件，注册为自己的子组件
- 将注册子组件时候的注册名称，以标签的形式，在页面引用即可

### 评论子组件的数据获取和渲染
- 因为评论子组件是挂载到新闻详情页中，使用涉及到了父组件向子组件传值
父组件新闻详情页里将 新闻id 传入子组件
```html
<comment-box :id="this.id"></comment-box>
```

新闻详情子组件里用props接收
```js
export default {
    data(){
        return{
            pageIndex:1
        }，    
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + pageIndex)
        }
    },
    props:["id"]
}
```
子组件里用props接收到新闻id后，将数据保存到data中，然后渲染到页面
```js
import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex:1,
                comments:[],

            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                    console.log(result)
                    if(result.body.status === 0){
                        this.comments = this.comments.concat(result.body.message);
                    }else{
                        Toast('获取评论失败')
                    }
                })
            },
        },
        props:["id"]
    }
```

### 评论子组件的加载更多功能
- 为加载更多按钮绑定事件，在事件中，请求 下一页数据
```html
<mt-button type="primary" size="large" plain @click="getMoreComment">加载更多</mt-button>
```
- 点加载更多，让pageIndex自增，然后调用this.getComments()方法，重新获取最新一页数据，
- 为了防止新数据覆盖老数据的情况，通过数组拼接，将新请求到的数据拼接上原来的数据
```js
export default {
    data(){
        return{
            pageIndex:1,
            comments:[]
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                console.log(result)
                if(result.body.status === 0){
                    this.comments = this.comments.concat(result.body.message);
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        getMoreComment(){
            this.pageIndex++;
            console.log(this.pageIndex)
            this.getComments();
        }
    },
    props:["id"]
}
```

### 评论子组件的发表评论功能
- 把文本框做双向数据绑定
```html
<textarea placeholder="最多吐槽120字" maxlength="120" v-model='message'></textarea>
```
- 为发表按钮绑定事件
```html
<mt-button type="danger" size="large" @click="postComment">发表评论</mt-button>
```
- 校验评论内容是否为空如果为空，提示用户评论内容不能为空
```js
if(this.message.trim().length == 0){
    return Toast("评论内容不能为空!")
}
```
- 通过 vue-resource，发送一个请求，把评论内容提交到服务器

- 当评论发表后，重新刷新列表，已查看最新的评论
- 如果调用 getComments()方法，重新刷新评论列表，可能只能得到最后一页的评论，前面几页新数据获取不到
- 所以换个思路，当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用数组的unshift方法，把最新的评论，追加到 data中的comments的开头，这样就能发表评论后，看到自己的评论
```js
postComment(){
    //校验是否为空内容
    if(this.message.trim().length == 0){
        return Toast("评论内容不能为空!")
    
    // 发表评论
    // 参数1：请求的url地址
    // 参数2：提交给服务器的数据对象
    // 参数3：定义提交时候，表单数据的格式{emilateJSON:true}
    this.$http.post('api/postcomment/' + this.{content:this.message.trim()}).then(result => {
        if(result.body.status === 0){
            //1. 拼接一个评论对象
            var cmt = {user_name:'匿名用户',add_time:Date.nowcontent:this.message.trim()};
            this.comments.unshift(cmt);
            this.message = ''
        }
    })
}
```

## 图片分享 组件制作
### 改造图片分享按钮 为路由链接，并显示对应的组件页面
```html
 <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist"><img src="../../images/tpfx.png"><div class="mui-media-body">图片分享</div></router-link></li>
```

### 绘制 图片列表 组件结构并美化
- 制作 顶部滑动条制作
    - 借助 MUI 的滑动导航，将其改造
    - 因为这个组件涉及到js，所以要初始化下控件
        - 先在 图片分享组件页面 导入 mui.js
        - 在图片分享组件页面里 的mounted钩子函数里 初始化，这样能解决滑动条无法正常工作
            ```js
            // 导入 mui.js 文件
            import mui from '../../lib/mui/js/mui.js'
            export default {
                data(){
                    return {}
                },
                mounted () {
                    // 初始化控件
                    // 如果要操作元素，最好在mounted里操作
                    mui('.mui-scroll-wrapper').scroll({
                        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    });
                }
            }
            ```
        - 在初始化滑动条时，导入mui.js，但是会报错，是mui.js用到的某些东西，但是webpack打包好的bundle.js中，默认启用严格模式，两者产生冲突
        - 解决方案:
            1. 把 mui.js中的 非严格模式代码修改，但是不现实
            2. 禁用webpack的严格模式
            
                2.1 安包 npm install babel-plugin-transform-remove-strict-mode -D
                
                2.2  在.babelrc配置文件plugins中加入 "transform-remove-strict-mode"
    - 获取分类，并渲染到页面
    ```js
    getAllCategory(){
        //获取所有的图片分类
        this.$http.get('api/getimgcategory').then(result => {
            if(result.body.status === 0){
                //手动拼接出最完整的列表
                result.body.message.unshift({title:"全部",id:0})
                this.cates = result.body.message;
            }
        })
    }
    ```

- 制作 底部的图片列表
    - 图片列表需要冷加载技术，我们可以使用Mint—UI 现成的组件 'lazy load'
    - 根据lazy-load 使用文档，尝试使用
        - 冷加载不能按需导入，所以只能全局导入
    - 渲染图片列表数据
    ```js
    getPhotoListByCateId(cateId){
        //根据分类id获取图片列表
        this.$http.get('api/getimages/' + cateId).then(result => {
            if(result.body.status === 0){
                this.list = result.body.message;
            }
        })
    }
    ```

## 图片详情页面制作
- 改造原来的图片列表的li为 router-link 然后将其用tag渲染为li
```html
<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
    <img v-lazy="item.img_url">
    <div class="info">
        <h1 class="info-title">{{item.title}}</h1>
        <div class="info-body">{{item.zhaiyao}}</div>
        
    </div>
</router-link>
```
- 图片列表组件向图片详情组件传递图片id
```html
<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
	{{item.title}}
</a>
```
- 然后图片详情组件获取图片id
```js
data(){
    return {
        id:this.$route.params.id, //从路由中获取图片id
    }
}
```
- 获取到图片id后，向通过$http拿取数据
```js
getPhotoInfo(){
    this.$http.get('api/getimageInfo/' + this.id).then(result {
        if(result.body.status === 0){
            this.photoinfo = result.body.message[0];
        }
    })
}
```
- 然后搭建结构，美化制作页面
- 放置评论子组件
    1. 在图片详情组件页面先导入子组件
    ```js
    import comment from '../../components/subcomponents/comment.vue'
    ```
    2. 在图片详情组件页面注册子组件
    ```js
    export default {
        data(){
            return { }
        }, 
        //注册子组件
        components:{
            'cmt-box':comment
        }
    }
    ```
    3.在页面中以标签形式引入，然后传值
    ```html
    <cmt-box :id="id"></cmt-box>
    ```
- 图片详情中间部分的缩略图制作
    - Vue preview ：一个Vue集成photoSwipe图片预览插件
    - >安装插件    npm i vue-preview -s
    - 在main.js中安装注册
        - >import VuePreview from 'vue-preview'    
        - >Vue.use(VuePreview)
    - 在页面中丢入
    ```html
    <vue-preview class="preview-img" :slides="list"></vue-preview>
    ```

## 商品列表改造
- 搭建结构，美化页面
- 获取数据,然后实现点击加载更多，来获取第二页数据
- 具体方法为：第一页存放数据的数组 拼接第二页存放数据的数组
```js
export default {
    data(){
        return {
            pageIndex:1,
            goodslist:[]
        }   
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                if(result.body.status === 0){
                    //this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMoreGoods(){
            this.pageIndex++;
            this.getGoodsList()
        }
    }
}
```

## 图片详情制作
- 改造商品链接路由
    -网页中有两种跳转方式
        1. a 标签形式，叫做标签跳转
        2. 使用 window.location.href 的形式，叫做 编程式导航
    - 在商品详情页跳转 我们 改为编程式跳转
        - `注意：this.$route 和 this.$router 这两个对象`
            - `this.$router` 是 `路由参数对象`，所有路由参数对象，所有路由中的参数，params ，query 都属于它
            - `this.$router` 是 `路由导航对象`，用它，可以方便的使用js代码来实现路由的前进和后退，跳转到新的 URL 地址
        - 实现方法：为div设置点击事件
        -  ```js
            goDetail(id){
                // 1. 传递字符串 最简单的
                //this.$router.push('/home/goodsinfo/' + id);

                // 2. 传递对象
                //this.$router.push({path:''/home/goodsinfo/' + id'});

                // 3. 传递一个命名的路由
                this.$router.push({name:'user',params:{id:id}})

                // this.$router 下还有 
                // this.$router.back(1),this.$router.forward(1),this.$router.to()
            }
            ```

- 制作商品轮播图和商品详情页面
    - 搭建结构，美化布局
    - 通过从 this.$route.parmas.id 获取路由上传入的id
    - 然后请求获取数据
    ```js
    export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotulist:[],
            goodsinfo:[]
        }
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo()
        },
        methods: {
            getLunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then(result => {
                    if(result.body.status === 0){
                        //先循环每一项，然后为item添加img属性，因为，轮播图组件只认识item.img，不认识item.src
                        result.body.message.forEach(item => {
                            item.img = item.src
                        })
                    
                    this.lunbotulist =  result.body.message;
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },

        },
        components:{
            swiper:swiper,
            numbox:numbox
        }
    }
    ```

- 制作商品图文介绍按钮和商品评价的点击事件
    ```js
    goDesc(id){
        //点击跳转图文介绍
        this.$router.push({name:'goodsdesc',params:{id:id}})
    },
    goComment(id){
        //点击跳转商品评论
        this.$router.push({name:'goodscomment',params:{id:id}})
    }
    ```

## 加入购物车小球动画 及 数量关联
- 给小球添加动画,然后添加动画钩子函数
```html
<transition @before-enter="beforeenter" @enter="enter" @after-enter="afterenter">
        <div class="ball" v-show="ballFlag"></div>
</transition>
```

- 动画执行的钩子函数
```js
beforeenter(el){
    el.style.transform = "translate(0,0)"
},
enter(el,done){
    el.offsetWidth;
    //小球动画优化思路
    // 动态 获取 位置
    // 先得到购物车冒泡的 横纵坐标，然后得到 小球的 横纵坐标，然后yx求差得到位移的距离
    // 获取dom对象的位置：domObject.getBoundingclintRect()
    // 获取小球在页面中的位置
    const ballPosition = this.$refs.ball.getBoundingClientRect();
    //获取徽标在页面中的位置
    const badgePosition = document.getElementByI('badge'.getBoundingClientRect();
    const xDist = badgePosition.left - ballPosition.left + "px";
    const yDist = badgePosition.top - ballPosition.top + "px";
    console.log(xDist + " " +yDist)
    el.style.transform = `translate(${xDist},${yDist})`;
    el.style.transition = "all 0.5s ease";
    done()
},
afterenter(el){
    this.ballFlag = !this.ballFlag
}
```

- 点击加入购物车后，将数字选择框里的数字同步到购物车
    - 由于数字选择框是子组件，就涉及到了 子组件向父组件传值（事件调用机制）
    - 事件调用机制的本质：父向子传递方法，自调用这个方法，同时把 数据当做参数，传递给这个方法
    - 现在父组件上定义一个方法
    ```js
    getSelectedCount(count){
        //当子组件把选中的数量传递给父组件的时候，把选中的值保存到父组data上
        this.selectedCount = count;
    }
    ```

    - 在父组件上绑定给子组件方法
    ```html
    <p>购买数量：<numbox @getcount="getSelectedCount"></numbox></p>
    ```
    - 在子组件上使用@change监听文本框的变化,然后调用父组件方法，然后传值出去
    ```html
    <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    ```
    ```js
    countChanged(){
        // 每当文本框的数据被修改的时候，立即把最新的数据通过事件调用，传给父组件
        // console.log(this.$refs.numbox.value)
        this.$emit('getcount',parseInt(this.$refs.numbox.value))
    }
    ```

    - 通过库存来设置数字选择框的最大值
        -首先，通过 父组件向子组件传递库存最大值(:max="goodsinfo.stock_quantity")
        ```html
        <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
        ```
        - 然后在子组件里接收
        ```js
        export default {  
            props:['max'],
        }
        ```
        - 问题：由于数据为异步获取，所以我们不知道什么时候拿到maxxNum数据，但总有一刻，会拿到maxNum我们可以使用 watch 属性来监听父组件传递过值
        - 然后通过watch来监听库存最大值的变化
        ```js   
        watch:{
            max:function(newVal,oldVal){
                mui(".mui-numbox").numbox().setOption("max",newVal)
            }
        }
        ```

## 购物车数据联动
- 使用vuex来实现数据联动
- 现在main.js里new一个实例
```js
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        car:[],  //将购物车的商品数据，用一个数组存储起来,在car数组中，存储一些商品的对象，可以将暂时将商品对象设计为{id:,price:,count,selected:}
    },
    mutations: {
        addToCar(state,goodsinfo){
            //果然购物车已经有了这个商品，则只需更新数量
            //果然不存在，则直接将商品数据加入car中即可
            //假设没有找到
            var flag = false;

            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            })

            // 如果循环完毕后，得到的flag=false，得到的数据直接push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }
        }
    },
    getters:{
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c;
        }
    }
})
```

- 更新car以后，把car数据存储到本地的localStorage中,然后每次进入网站，会调用main.js，在刚调用的时候，先从本地存储中获取
```js
//每次进入网站，会调用main.js，在刚调用的时候，先从本地存储中获取
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state:{
        car:car,
    },
    mutations: {
        addToCar(state,goodsinfo){
            var flag = false;
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            })

            if(!flag){
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    
})
```

- 在商品详情页中的为 加入购物车 绑定事件（将商品数据存入vuex中）
```js
addToShopCar(){
    this.ballFlag = !this.ballFlag;
    //拼接处一个要 保存在 store 中的数组对对象
    var goodsinfo = {id:this.id,count:this.selectedCounprice:this.goodsinfo.sell_price,selected:true};
    //调用 store 中的 mutations 中方法
    this.$store.commit('addToCar',goodsinfo)
},
```

- 加入购物车后，小球会掉入购物车，购物车上会显示加入购物车商品的数量，这个时候调用 store 中的数据。调用方法可以使用getters，来统计商品的个数
```html
<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
```
```js
getters:{
    getAllCount(state){
        var c = 0;
        state.car.forEach(item => {
            c += item.count
        })
        return c;
    }
}
```

- 渲染出购物车上的商品数据,
    - 先通过从store中获取数据，然后遍历数据，将数据的id都放入临时声明的数组中，然后判断数组中是否存在数据，若存在则通过ajax发送请求（参数需要临时数组里的id）。获取到商品信息后存放入data总，然后在页面中渲染出数据。
```js
export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            //获取store中所有商品的id，拼接为一个字符串
            var idArr = [];
            this.$store.state.car.forEach(item => {
                return idArr.push(item.id)
            })
            
            if(idArr.length == 0){
                return;
            }

            this.$http.get('api/goods/getshopcarlist/' + idArr).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message;
                }
            })
        }
    }
}
```

- 获取到购物车中 数字选择框组件的默认值
    - 父组件为购物车页面，先选择框页面传递商品id和该商品的数量
    ```html
    <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
    ```
    - 选择框子组件接收到数据后，一旦数量发生改变，就触发函数，将数据作为参数给 store里的mutations
    ```html
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly>
    ```
    ```js
    export default {
    mounted(){
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            // 每当有数量改变，则立刻把最新的数量同步到购物车的store中，覆盖之前的数量值
            this.$store.commit("updateGoods",{id:this.goodsid,count:this.$refs.numbox.value})
            }
        },
        props:['initcount','goodsid']
    }
    ```

- store中mutations中方法为
```js
updateGoods(state,goodsinfo){
    //修改购物车商品数量值
    state.car.some(item => {
        if(item.id == goodsinfo.id){
            item.count = parseInt(goodsinfo.count);
            return true
        }
    })
    //当修改完 商品的数量 ，把罪行的购物车数据保存到本地中
    localStorage.setItem('car',JSON.stringify(state.car))
}
```

- 实现购物车中商品删除的功能
    - 先绑定点击事件，remove中传入两个参数，一个item.id来删除store中的数据，i用于删除当前组件里data中保存的数据
    ```html
    <a href="#" @click.prevent="remove(item.id,i)">删除</a>
    ```
    - 在store中的mutations中定义一个新方法
    ```js
    removerCar(state,id){
        state.car.some((item,i) => {
            if(item.id == id){
                state.car.splice(i,1)
                return true;
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    }
    ```
    - 在点击事件中调用
    ```js
    remove(id,index){
        this.goodslist.splice(index,1);
        this.$store.commit('removerCar',id)
    }
    ```
- 实现购物车滑动按钮的功能
    - 将滑动按钮值到store中取
    - 具体方法是：先将store中的car的数据用getters方法包装处理出一个对象{id:boolean}
    ```js
    getGoodsSelected(state){
        var o = {};
        state.car.forEach(item => {
            o[item.id] = item.selected;
        })
        return o;
    }
    ```
    - 然后将按钮用v-model与该包装处理出来的数据关联，因为按钮也是渲染出来的，有对应的唯一id，通过id来获取值
    ```js
    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
    ```
    - 将滑动开关的值更新到store中的state中的car中，先在store中写更新的方法
    ```js
    updateGoodsSelected(state,info){
        state.car.some(item => {
            if(item.id == info.id){
                item.selected = info.selected
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    }
    ```
    - 当滑动开关值发生改变，调用@change函数,传入两个参数：商品id，selected值
    ```html
    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
    ```
    - 调用的方法中再调用store里更新的方法
    ```js
    selectedChanged(id,val){
        //每当点击开关，将最新的开关状态同步到store中
        this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
    ```
- 实现结算功能
    - 在store中通过getters包装处理出数据
    ```js
    getGoodsCountAndAmount(state){
        var o = {
            count:0,    //勾选的数量
            amount:0    //勾选的总价
        };
        state.car.forEach(item => {
            if(item.selected){
                o.count+=item.count;
                o.amount+=item.price * item.count;
            }
        })
        return o;
    }
    ```
    - 然后在页面渲染上，直接从getters中获取数据
    ```html
    <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
    ```
- 返回按钮的实现
    -通过watch监听$route.path的改变，来选择是否显示 返回按钮
    ```js
    export default {
        data(){
            return {
                flag :false
            }
        },
        created(){
            this.flag = this.$route.path === '/home' ? false:true
        },
        methods: {
            goBack(){
                //点击后退
                this.$router.go(-1)
            }
        },
        watch: {
            '$route.path':function(newVal){
                if(newVal == '/home'){
                    this.flag = false
                }else{
                    this.flag = true
                }
            }
        },
    }
    ```



