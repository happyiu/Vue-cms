<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="newlitem in newslist" :key="newlitem.id">
					<router-link :to="'/home/newsInfo/' + newlitem.id">
						<img class="mui-media-object mui-pull-left" :src="newlitem.img_url">
						<div class="mui-media-body">
							<h1>{{ newlitem.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{newlitem.add_time | dateFormat }}</span>
                                <span>点击：{{newlitem.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
        </ul>
    </div>
</template>

<script>

import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            newslist:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            this.$http.get("api/getnewslist").then(result => {
                if(result.body.status === 0){
                    this.newslist = result.body.message;
                    //console.log(this.newslist)
                } else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    }
}
</script>
    
<style scoped>
    h1{font-size: 14px}

    .mui-ellipsis {
        color: rgb(51, 81, 212);
        display: flex;
        justify-content: space-between
    }
</style>