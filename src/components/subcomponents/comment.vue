<template>
    <div>
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="最多吐槽120字" maxlength="120" v-model='message'>

        </textarea>
        <mt-button type="danger" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(comment,index) in comments" :key="index">
                <div class="cmt-title">
                    <span>第{{index+1}}楼-用户:{{comment.user_name}}</span><span>时间{{comment.add_time | dateFormat}}</span>
                </div>
                <div class="cmt-body">
                    <p>{{comment.content === 'undefined' ? '此用户很懒,什么都没说':comment.content}}</p>
                </div>
            </div>
        </div>
        <mt-button type="primary" size="large" plain @click="getMoreComment">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex:1,
                comments:[],
                message:''
            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                    //console.log(result)
                    if(result.body.status === 0){
                        this.comments = this.comments.concat(result.body.message);
                    }else{
                        Toast('获取评论失败')
                    }
                })
            },
            getMoreComment(){
                this.pageIndex++;
                //console.log(this.pageIndex)
                this.getComments();
            },
            postComment(){
                //校验是否为空内容
                if(this.message.trim().length == 0){
                    return Toast("评论内容不能为空!")
                }


                // 发表评论
                // 参数1：请求的url地址
                // 参数2：提交给服务器的数据对象
                // 参数3：定义提交时候，表单数据的格式{emilateJSON:true}
                this.$http.post('api/postcomment/' + this.id,{content:this.message.trim()}).then(result => {
                    if(result.body.status === 0){
                        //1. 拼接一个评论对象
                        var cmt = {user_name:'匿名用户',add_time:Date.now(),content:this.message.trim()};
                        this.comments.unshift(cmt);
                        this.message = ''
                    }
                })
            }
        },
        props:["id"]
    }
</script>

<style scoped>
    h3{
        font-size: 16px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0
    }
    .cmt-list{
        margin: 20px 0
    }
    .cmt-item{
        font-size: 14px
    }
    .cmt-title{
        background-color: #ccc;
        display: flex;
        justify-content: space-between
    }
    .cmt-body{
        line-height: 35px;
        text-indent: 2em
    }

</style>