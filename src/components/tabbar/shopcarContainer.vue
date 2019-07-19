<template>
    <div class="shopcar-container">
        <div class="goodlist">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">{{item.sell_price}}</span>
                                <!-- 如何获取从购物车中获取视频的数量？ -->
                                <!-- 我们先创建一个 空对象，然后循环购物车中所有商品的数据，把 当前循环这条商品 id作为对象的属性名，count值作为对象的属性值 -->
                                <!-- 把所有商品循环一遍，得到一个对象{88:2.86:3} -->
                                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>

    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            //获取store中所有商品的id，拼接为一个字符串
            var idArr = [];
            this.$store.state.car.forEach(item => {
                return idArr.push(item.id)
            })
            
            if(idArr.length == 0){
                return;
            }

            this.$http.get('api/goods/getshopcarlist/' + idArr).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message;
                }
            })
        },
        remove(id,index){
            this.goodslist.splice(index,1);
            this.$store.commit('removerCar',id)
        },
        selectedChanged(id,val){
            //每当点击开关，将最新的开关状态同步到store中

            this.$store.commit('updateGoodsSelected',{id,selected:val})

        }
    },
    components:{
        numbox
    }
}
</script>

<style scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden
    }
    .goodlist{
        
    }
    .goodlist img{
        width: 60px;
        height: 60px;
    }
    .goodlist h1{
        font-size: 16px;
        font-weight: bold
    }
    .mui-card-content-inner{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between
    }
    .price{
        color: red
    }
    .info{
        display: flex;
        flex-direction: column
    }
    .jiesuan{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center
    }
    .red{
        color: red
    }
</style>