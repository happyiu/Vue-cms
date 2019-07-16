<template>
<div class="newsInfo-contain">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
        <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
        <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr/>

    <div class="content" v-html="newsInfo.content"></div>

    <comment-box :id="this.id"></comment-box>

</div>
    
</template>

<script>
import {Toast} from 'mint-ui'

//导入子组件
import comment from '../subcomponents/comment.vue'



export default {
    data(){
        return{
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        //获取新闻详情
        getNewsInfo(){
            this.$http.get('api/getnew/'+ this.id).then(result => {
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0];
                    //console.log(this.newsInfo)
                } else{
                    Toast("获取新闻失败！")
                }
            })
        },

    },
    components:{
        //注册子组件
        'comment-box':comment
    }
}
</script>

<style scoped>
.newsInfo-contain{
    padding: 0px 4px
}
.title{
    font-size: 16px;
    text-align: center;
    margin: 15px;
    color: red
}
.subtitle{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}
.content img{
    width: 100px;
    height: 100px;
}
</style>