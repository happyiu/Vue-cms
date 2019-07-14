// 入口文件
import Vue from 'vue'

import 'mint-ui/src/style/empty.css'
// 按需导入 Mint-UI 组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

// 导入mui样式
import './lib/mui/css/mui.css'


import VueRouter from 'vue-router'

// 导入 app 根组件
import app from './app.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app)
})