<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
			</div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                    
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
// 导入 mui.js 文件
import mui from '../../lib/mui/js/mui.js'


export default {
    data(){
        return {
            cates:[], //所有分类列表
            list:[],  //图片
        }
    },
    mounted () {
        // 初始化控件
        // 如果要操作元素，最好在mounted里操作
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    methods: {
        getAllCategory(){
            //获取所有的图片分类
            this.$http.get('api/getimgcategory').then(result => {
                if(result.body.status === 0){
                    //手动拼接出最完整的列表
                    result.body.message.unshift({title:"全部",id:0})
                    this.cates = result.body.message;
                }
            })
        },
        getPhotoListByCateId(cateId){
            //根据分类id获取图片列表
            this.$http.get('api/getimages/' + cateId).then(result => {
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            })
        }
    }
}
</script>

<style scoped>
    *{
        touch-action: pan-y
    }
    .photo-list img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        
    }
    img{
        width: 100%;
        vertical-align: middle
    }
    .photo-list li{
        background-color: #ccc;
        text-align: center;
        list-style-type: none;
        margin-bottom: 10px;
        box-shadow: 0 0 6px #999;
        position: relative;

    }
    .photo-list{
        padding: 10px;
        margin: 0;
        padding-bottom: 0px;
    }
    .info{
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0,0,0,0.4);
        padding: 0 5px;
        text-align: justify;
        max-height: 84px;
        
    }
    .info-title{
        font-size: 14px;
    }
    .info-body{
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
    }
</style>