<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    type() {
      // 默认为 'router-link'，因为我们不再处理外部链接
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      return {
        to: to
      }
    }
  }
}
</script>
