# Mint UI
Mint-UI是基于vue的组件框架库
1. 首先在项目里安装 npm i mint-ui -s
2. 在main.js中导入所有的MintUI组件
```js
// 导入所有的mint-ui组件
import MintUI from 'mint-ui'
//这里可以省略，node_modules 这一层目录
import 'mint-ui/lib/style.css'
// 将 MintUI 安装到 Vue 中去，将所有的组件注册为全局组件
Vue.use(MintUI)
```

# 使用方法
css组件可以直接使用
js组件要先引入
```js
import {Toast} from 'mint-ui'

    export default {
        data(){
            return {}
        },
        methods: {
            show(){
                //可以配置弹出信息
                Toast({
                    message:'hello',
                    position:'center',
                    duration:1000
                })
            }   
        }
    }
```

# 按需导入组件
npm install babel-plugin-component -D
然后在 main.js 导入
```js
//按需导入 Mint-ui组件
import { Button } from 'mint-ui'
//使用Vue.component 注册组件
Vue.component(Button.name,Button)
```

# MUI 
是一套好用的代码片段，里面提供了配置的样式，配套的html代码段，类似于bootstrap
```js
//导入 mui 的样式表
import './lib/mui/css/mui.css'
```