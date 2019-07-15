// 入口文件
import Vue from 'vue'

import 'mint-ui/src/style/empty.css'
// 按需导入 Mint-UI 组件
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

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


var vm = new Vue({
    el:'#app',
    render: c => c(app),
    //1.4 挂载路由对象到app上
    router:router
})