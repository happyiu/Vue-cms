<template>
    <div id="mainbv">
        <!--顶部header-->
        <mt-header fixed title="黄即吧">
			<span @click="goBack" slot="left" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

        <!--中间 路由 router-view-->
		<transition>
			<router-view></router-view>
		</transition>

        <!--底部Tabbar区域-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-b" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-b" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-b" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-b" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
export default {
	data(){
		return {
			flag :false
		}
	},
	created(){
		this.flag = this.$route.path === '/home' ? false:true
	},
	methods: {
		goBack(){
			//点击后退
			this.$router.go(-1)

		}
	},
	watch: {
		'$route.path':function(newVal){
			if(newVal == '/home'){
				this.flag = false
			}else{
				this.flag = true
			}
		}
	},
}
</script>

<style scoped>
    #mainbv{
        padding-top: 40px;
        padding-bottom: 60px;
		overflow-x: hidden;

    }
	.v-enter{
		opacity: 0;
		transform: translateX(100%)
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute
	}
	.enter-active,.v-leave-active{
		transition: all 0.5s ease;
	}
	.mint-header{
		z-index: 99;
	}
	.mui-bar-tab .mui-tab-item-b {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-b .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-b .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-b .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-b.mui-active {
    color: #007aff;
}
</style>