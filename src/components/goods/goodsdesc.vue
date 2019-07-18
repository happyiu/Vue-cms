<template>
    <div class="goodsdesc-container">
        <h3 class="goodsdesctitle">{{goodsdesc.title}}</h3>
        <div id="goodsdesccontent" v-html="goodsdesc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
            goodsdesc:[]
        }
    },
    created() {
        this.getGoodDesc()
    },
    methods: {
        getGoodDesc(){
            this.$http.get('api/goods/getdesc/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsdesc = result.body.message[0];
                }
            })
        }
    },

}
</script>

<style>
    #goodsdesccontent{
        width: 100%
    }
    #goodsdesccontent img{
        width: 100%
    }
    .goodsdesctitle{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0
    }
</style>