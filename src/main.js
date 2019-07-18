// 入口文件
import Vue from 'vue'

import 'mint-ui/src/style/empty.css'
// 按需导入 Mint-UI 组件
// import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'



// 导入mui样式
import './lib/mui/css/mui.css'
// 导入mui扩展样式
import './lib/mui/css/icons-extra.css'


//导入路由
import VueRouter from 'vue-router'
//启用路由
Vue.use(VueRouter)

// 导入 app 根组件
import app from './app.vue'

//1.3 导入自己的router.js模块
import router from './router.js'

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 Vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//设置全局 post 时候表单数据的 组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//缩略图插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

//导入时间插件
import moment from 'moment'
//定义过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    //1.4 挂载路由对象到app上
    router:router
})