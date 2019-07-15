import VueRouter from 'vue-router'

import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'

import nwesList from './components/news/newList.vue';
import newsInfo from './components/news/newsInfo.vue'


var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/search',component:searchContainer},
        {path:'/shopcar',component:shopcarContainer},
        {path:'/home/newslist',component:nwesList},
        {path:'/home/newsInfo/:id',component:newsInfo},

      ],
      linkActiveClass:'mui-active'  //覆盖默认的路由高亮的类，默认类叫做 router-link-active
  })

  export default router
  