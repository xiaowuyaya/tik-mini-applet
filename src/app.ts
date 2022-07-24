/*
 * @Author: your name
 * @Date: 2022-01-21 15:46:47
 * @LastEditTime: 2022-01-21 15:58:44
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nutui-demo/taro/src/app.ts
 */
import { createApp } from 'vue';
import { Icon, Button, Input, Form,FormItem,Cell,CellGroup } from '@nutui/nutui-taro';
import { createPinia } from 'pinia'
import './app.scss';
import 'windi.css';


//这里添加用到的 nutui 组件
const nutuiComponents = [Button, Input,Form,FormItem,Cell,CellGroup];

const App = createApp({
  onShow(_options) { }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})


nutuiComponents.forEach(item => {
  App.use(item);
})

App.use(createPinia())
App.use(Icon)


export default App;
