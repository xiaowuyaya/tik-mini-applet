import { createApp } from 'vue';
import { Icon, Button, Input, Form, FormItem, Cell, CellGroup, Layout, Row, Col, Avatar, Grid, GridItem, Toast, Table, Picker,  Popup, OverLay, Empty, InputNumber  } from '@nutui/nutui-taro';
import { createPinia } from 'pinia'
import './app.scss';
import 'windi.css';


//这里添加用到的 nutui 组件
const nutuiComponents = [Button, Input, Form, FormItem, Cell, CellGroup, Layout, Row, Col, Avatar, Grid, GridItem, Toast, Table, Picker,  Popup, OverLay, Empty, InputNumber ];

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
