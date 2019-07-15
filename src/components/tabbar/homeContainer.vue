<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in LuBotuList" :key="item.url">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/xwzx.png">
		            <div class="mui-media-body">新闻资讯</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/tpfx.png">
		            <div class="mui-media-body">图片分享</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/spgm.png">
		            <div class="mui-media-body">商品购买</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/lyfk.png">
		            <div class="mui-media-body">留言反馈</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/spzx.png">
		            <div class="mui-media-body">视频专区</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/lxwm.png">
		            <div class="mui-media-body">联系我们</div></a></li>
		</ul> 



    </div>
</template>

<script>

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
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
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