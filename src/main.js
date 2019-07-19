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

import Vuex from 'vuex'
Vue.use(Vuex)
//每次进入网站，会调用main.js，在刚调用的时候，先从本地存储中获取
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{
        car:car,  //将购物车的商品数据，用一个数组存储起来,在car数组中，存储一些商品的对象，可以将暂时将商品对象设计为{id:,price:,count,selected:}
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

            localStorage.setItem('car',JSON.stringify(state.car))
        },
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
        },
        removerCar(state,id){
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
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
    },
    
})


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
    router:router,
    // 挂载 store 状态管理器
    store
})