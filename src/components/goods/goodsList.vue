<template>
    <div class="goods-list">
        <!--路由导航-->
        <!-- <router-link tag="div" :to="'/home/goodsinfo/'+ glist.id" class="goods-item" v-for="glist in goodslist" :key="glist.id">
            <img :src="glist.img_url">
            <h1 class="title">{{glist.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{glist.sell_price}}</span>
                    <span class="old">￥{{glist.market_price}}</span>
                </p>
                <p class="sell">
                    <span class="">热卖中</span>
                    <span class="">剩{{glist.stock_quantity}}</span>

                </p>
            </div>
        </router-link> -->

        <!--编程式导航-->
         <div class="goods-item" v-for="glist in goodslist" :key="glist.id" @click="goDetail(glist.id)">
            <img :src="glist.img_url">
            <h1 class="title">{{glist.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{glist.sell_price}}</span>
                    <span class="old">￥{{glist.market_price}}</span>
                </p>
                <p class="sell">
                    <span class="">热卖中</span>
                    <span class="">剩{{glist.stock_quantity}}</span>

                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getMoreGoods">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageIndex:1,
            goodslist:[]
        }   
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                if(result.body.status === 0){
                    //this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMoreGoods(){
            this.pageIndex++;
            this.getGoodsList()
        },
        goDetail(id){
            //使用js的方式，进行路由导航
            // `注意：this.$route 和 this.$router 这两个对象`
            // - `this.$router` 是 `路由参数对象`，所有路由参数对象，所有路由中的参数，params ，query 都属于它
            // - `this.$router` 是 `路由导航对象`，用它，可以方便的使用js代码来实现路由的前进和后退，跳转到新的 URL 地址
            // 1. 传递字符串 最简单的
            //this.$router.push('/home/goodsinfo/' + id);

            // 2. 传递对象
            //this.$router.push({path:''/home/goodsinfo/' + id'});

            // 3. 传递一个命名的路由
            this.$router.push({name:'goodsinfo',params:{id:id}})

            // this.$router 下还有 
            // this.$router.back(1),this.$router.forward(1),this.$router.to()

        }
    }
}
</script>

<style scoped>

    .goods-list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px
        
    }
    .goods-item{
        width: 48%;
        border: 1px solid #cccccc;
        box-shadow: 0 0 8px #ccc;
        margin: 5px 0;
        min-height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between
    }
    .goods-item img{
        width: 100%
    }
    .title{
        font-size: 15px;
        width: 100%;
    }
    .info{
        background-color: #eee
    }
    .now{
        color: red;
        font-size: 14px;
    }
    .old{
        text-decoration: line-through;
        font-size: 13px;
        margin-left: 10px;
    }
    p{
        margin: 0px;
        padding: 5px
    }
    .sell{
        display: flex;
        flex-direction: row;
        justify-content: space-between
    }
</style>