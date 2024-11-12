import { createStore } from 'vuex'
import getters from './getters'

// 动态导入模块
const modulesFiles = import.meta.glob('./modules/**/*.js', { eager: true })

// 通过动态导入模块生成 Vuex 的模块配置
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  // 从模块路径中提取模块名
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const moduleValue = modulesFiles[modulePath].default
  modules[moduleName] = moduleValue
  return modules
}, {})

// 创建 Vuex store 实例
const store = createStore({
  modules,
  getters
})

export default store
