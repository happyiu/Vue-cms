 <template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <P class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{photoinfo.click}}</span>
        </P>
        <hr/>

        <!--图片缩略图-->
        <div class="thumbs">
            <vue-preview class="preview-img" :slides="list"></vue-preview>
        </div>


        <!--图片内容区-->
        <div class="content" v-html="photoinfo.content"></div>


        <!--放置现成的评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>

import comment from '../../components/subcomponents/comment.vue'

    export default {
        data(){
            return {
                id:this.$route.params.id, //从路由中获取图片id
                photoinfo:[],
                list:[]     //缩略图的数组
            }
        },  
        created(){
            this.getPhotoInfo();
            this.getThumbs()
        },
        methods: {
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if(result.body.status === 0){
                        this.photoinfo = result.body.message[0];
                    }
                })
            },
            getThumbs(){
                this.$http.get('api/getthumimages/' + this.id).then(result => {
             
                    if(result.body.status === 0){
                        //循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.msrc = item.src;
                            item.w = 400;
                            item.h = 300;
                        })
                        //然后保存到list中
                        this.list = result.body.message;
                        console.log(this.list)

                    }
                })
            }
        },
        //注册子组件
        components:{
            'cmt-box':comment
        }
    }
</script>


<style scoped>
    .photoinfo-container{
        padding: 8px;

    }
    h3{
        color: blue;
        font-size: 16px;
        text-align: center;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 14px
    }
    .content{
        font-size: 14px;
        line-height: 24px;
    }
    .thumbs{
        display: flex;
        flex-direction: row;

    }
</style>