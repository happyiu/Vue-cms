// 当我们在控制台输入 webpack 命令执行的时候，webpack做了以下几步
// 1.首先webpack发现，我们并没有太过命令的形式，给它指定入口和出口
// 2.webpack 就会去项目的根目录中，查找一个叫做webpack.config.js 的配置文件
// 3.当找到配置文件后，webpack解析执行文件，当解析执行完配置文件后，得到了 配置文件中，导出的配置对象
// 4.当webpack拿到配置对象后，就拿到了配置对象中的入口和出口 ，然后打包构建



const path = require('path')


//只要是插件，都要放到 plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置文件就是js文件，通过Node中的模块操作，向外暴露一个配置对象
module.exports = {
    // 在配置文件里，可以手动指定入口和出口
    entry: path.join(__dirname,'./src/main.js'),     //入口，表示，要使用webpack打包哪个文件
    output:{
        //输出文件配置,指定 打包好的文件，输出到哪个目录中去
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'    //指定输出文件的名称
    },
    plugins:[
        new htmlWebpackPlugin({
            //创建一个 在内存中 生成 html页面的插件
            template:path.join(__dirname,'./src/index.html'),    //这是根据指定模板页面路径，去生成内存中的页面
            filename:'index.html'   //指定生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    // 这个节点用来配置所有的第三方模块 加载器
    module:{
        rules:[
            //所有第三方模块的匹配规则
            {test: /\.css$/,use:['style-loader','css-loader']}, //这是配置处理.css文件的第三方loader规则
            //{test: /\.less$/,use:['style-loader','css-loader','less-loader']}   //配置处理.less文件的第三方loader规则
            //{test: /\.scss$/,use:['style-loader','css-loader','sass-loader']}   //配置处理.scss文件的第三方loader规则
            // 处理图片路径的loader
            // limit 给定的值是图片的大小，单位是byte，如果引用的图片大于或等于给定的limit值，则不会被转为base64
            // 如果 图片小于给定的limit值，则会被转化为base64的字符串
            {test:/\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=1851850&name=[hash:8]-[name].[ext]'},
            //处理字体文件的loader
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},  //这是配置babel来转化高级语法
            {test:/\.vue$/,use:'vue-loader'},      //这是处理.vue 文件的loader

        ]
    }
    // ,
    // resolve:{
    //     alias: {    //第三种方式 这是设置 vue 导入包的路径
    //         'vue$': 'vue/dist/vue.js'
    //     }
    // }
    // ,
    // devServer:{
    //     open:true,  //自动打开浏览器
    //     port:3000,  //设置启动时候的运行端口
    //     contentBase:'src',  //指定托管的根目录
    //     hot:true    // 启用热更新 的 第一步
    // },
    // plugins:[
    //     new webpack.HotModuleReplacementPlugin()  //new 一个热更新的模块，启用热更新
    // ]


}