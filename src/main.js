import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElMenu, ElScrollbar, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/styles/index.scss'
import './styles/element-variables.scss'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue';

// 自行添加，直接把所有的ElmentPlus组件注册
import ElementPlus from 'element-plus'

const app = createApp(App)
app.component('svg-icon', SvgIcon); // 确保这里的注册是正确的
app.use(router)
app.use(store)


app.use(ElementPlus)

app.mount('#app')