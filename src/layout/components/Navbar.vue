<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
    <breadcrumb />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

export default {
  components: { Breadcrumb, Hamburger },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
}

.hamburger-container {
  cursor: pointer;
}

.breadcrumb-container {
  margin-left: 16px;
}
</style>
