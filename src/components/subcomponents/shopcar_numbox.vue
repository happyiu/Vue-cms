<template>
    <div class="mui-numbox" data-numbox-min="1" style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'


export default {
    mounted(){
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            // 每当有数量改变，则立刻把最新的数量同步到购物车的store中，覆盖之前的数量值
            this.$store.commit("updateGoods",{id:this.goodsid,count:this.$refs.numbox.value})
            
        }
    },
    props:['initcount','goodsid']
}
</script>

<style scoped>
    .mui-numbox{
        height: 30px;
    }

</style>