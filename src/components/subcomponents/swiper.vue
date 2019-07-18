<template>
    <div>
        <mt-swipe :auto="4000">
            <!--谁使用轮播图组件，谁传递 LuBotuList-->
            <!-- 此时应该是父组件向子组件传值 -->
            <mt-swipe-item v-for="item in LuBotuList" :key="item.id">
                <img :src="item.img" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>



<script>
export default {
    props:['LuBotuList','isfull']
}
</script>

<style scoped>
    .mint-swipe{
        height: 175px;
    }
    .mint-swipe-item{
        text-align: center
    }
    img{
        /* width: 100%; */
        height: 100%;
    }
    .full{
        width: 100%
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