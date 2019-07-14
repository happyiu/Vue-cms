<template>
    <div>
        <h1>登录组件，这是.vue文件定义出来的!--{{msg}}</h1>
    </div>
</template>

<script>
export default{
    //组件中的data是function
    data(){
        return {
            msg:123
        }
    },
    methods: {
        show(){
            console.log('调用了 login.vue 中的 show 方法')
        }
    }
}
</script>

<style>

</style>