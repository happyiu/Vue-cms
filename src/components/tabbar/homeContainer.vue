<template>
    <div>
        <!--轮播图-->
        <swiper :LuBotuList="this.LuBotuList" :isfull="true"></swiper>

        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/xwzx.png">
		            <div class="mui-media-body">新闻资讯</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		            <img src="../../images/tpfx.png">
		            <div class="mui-media-body">图片分享</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		            <img src="../../images/spgm.png">
		            <div class="mui-media-body">商品购买</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		            <img src="../../images/lyfk.png">
		            <div class="mui-media-body">留言反馈</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		            <img src="../../images/spzx.png">
		            <div class="mui-media-body">视频专区</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="">
		            <img src="../../images/lxwm.png">
		            <div class="mui-media-body">联系我们</div></router-link></li>
		</ul> 

    </div>
</template>

<script>

    import {Toast} from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'

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
                this.$http.get('api/getlunbo').then(result => {
                   //console.log(result.body)
                   if(result.body.status === 0){
                        this.LuBotuList = result.body.message;
                    } else{
                        Toast('获取；轮播图加载失败')
                    }
                })
            }   
        },
        components:{
            swiper:swiper
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height: 175px;
    }
    .mint-swipe-item:nth-child(odd){
        background-color: pink
    }
    img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: 0px
    }
    .mui-grid-view.mui-grid-9 img{
        width: 40px;
        height: 40px;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 14px
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0px;
    }
</style>