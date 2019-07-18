import VueRouter from 'vue-router'

import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'

import nwesList from './components/news/newList.vue';
import newsInfo from './components/news/newsInfo.vue';
import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'

import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/search',component:searchContainer},
        {path:'/shopcar',component:shopcarContainer},
        {path:'/home/newslist',component:nwesList},
        {path:'/home/newsInfo/:id',component:newsInfo},
        {path:'/home/photolist',component:photoList},
        {path:'/home/photoinfo/:id',component:photoInfo},
        {path:'/home/goodslist',component:goodsList},
        {path:'/home/goodsinfo/:id',component:goodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'}

      ],
      linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认类叫做 router-link-active
  })

  export default router
  