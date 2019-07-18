<template>
    <!-- 问题：由于数据为异步获取，所以我们不知道什么时候拿到maxxNum数据，但总有一刻，会拿到maxNum
         我们可以使用 watch 属性来监听父组件传递过来的 值，
     -->
    <div class="mui-numbox" data-numbox-min="1">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'


export default {
    mounted(){
        //初始化组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            // 每当文本框的数据被修改的时候，立即把最新的数据通过事件调用，传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],
    watch:{
        max:function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption("max",newVal)
        }
    }
}
</script>

<style scoped>
    .mui-numbox{
        height: 30px;
    }

</style>