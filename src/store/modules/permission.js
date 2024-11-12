import { constantRoutes } from '@/router'

const state = {
  routes: constantRoutes // 初始化时就使用静态路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    // 直接使用静态路由
    commit('SET_ROUTES', constantRoutes)
    return Promise.resolve(constantRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
