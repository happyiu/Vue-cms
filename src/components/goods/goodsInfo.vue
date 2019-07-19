<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeenter" @enter="enter" @after-enter="afterenter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播-->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <swiper :LuBotuList="this.lunbotulist"></swiper>
					
                    
				</div>
			</div>
		</div>

        <!--商品购买-->
        <div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    

                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 涉及到了父子组件的嵌套，所以无法 直接在 goodsInfo页面中获取到商品的数量值
                             就涉及到子组件向父组件传值（事件调用机制）
                         -->
                    </p>
				</div>
			</div>
		</div>

        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<P>商品货号：{{goodsinfo.goods_no}}</P>
					<P>库存情况：{{goodsinfo.stock_quantity}}</P>
					<P>上架时间：{{goodsinfo.add_time | dateFormat}}</P>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="primary" size="large" plain @click="goComment(id)">商品评价</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue';
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotulist:[],
            goodsinfo:[],
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    //先循环每一项，然后为item添加img属性，因为，轮播图组件只认识item.img，不认识item.src
                    result.body.message.forEach(item => {
                        item.img = item.src
                    })
                   
                   this.lunbotulist =  result.body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                }
            })
        },
        goDesc(id){
            //点击跳转图文介绍
            this.$router.push({name:'goodsdesc',params:{id:id}})
        },
        goComment(id){
            //点击跳转商品评论
            this.$router.push({name:'goodscomment',params:{id:id}})
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
            //拼接处一个要 保存在 store 中的数组对对象
            var goodsinfo = {id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true};
            //调用 store 中的 mutations 中方法
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeenter(el){
            el.style.transform = "translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化思路
            // 动态 获取 位置
            // 先得到购物车冒泡的 横纵坐标，然后得到 小球的 横纵坐标，然后yx轴求差。得到位移的距离
            // 获取dom对象的位置：domObject.getBoundingclintRect()

            // 获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left + "px";
            const yDist = badgePosition.top - ballPosition.top + "px";

            console.log(xDist + " " +yDist)

            el.style.transform = `translate(${xDist},${yDist})`;
            el.style.transition = "all 0.5s ease";
            done()
        },
        afterenter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件的时候，把选中的值保存到父组件data上
            this.selectedCount = count;
            // console.log(this.selectedCount)
        }

    },
    components:{
        swiper:swiper,
        numbox:numbox
    }
}
</script>

<style scoped>
    .goodsinfo-container{
        background-color: rgb(241, 241, 241);
        overflow: hidden;
    }
    .now_price{
        color:red;
        font-size: 15px;
        font-weight: bold
    }
    .mui-card-footer{
        display: flex;
        flex-direction: column;
    }
    .mui-card-footer button{
        margin-top: 10px;
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color:red;
        position: absolute;
        z-index: 99;
        left: 150px;
        top: 360px
    }
</style>