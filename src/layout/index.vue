<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar  class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    
    @include clearfix; 
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
