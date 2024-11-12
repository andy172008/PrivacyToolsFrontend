<template>
  <!-- 显示 MSE -->
  <div class="mse">
      <p>MSE: {{ mseValue }}</p>
  </div>
  
  <div class="footer">  
    <!-- 显示真实频率的柱状图 -->
    <bar-chart 
      :data_t="realFrequencyData" 
      :data_e="estimatedFrequencyData"
      :labels="labels"
    />
  </div>
</template>

<script>
import BarChart from './BarChart.vue'; // 假设有一个柱状图组件

export default {
  components: {
    BarChart,
  },
  props: {
    realFrequencyData: {
      type: Array,
      required: true
    },
    estimatedFrequencyData: {
      type: Array,
      required: true
    },
    mseValue: {
      type: Number,
      default: 0
    },
    labels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

.mse {
  font-weight: bold;
  margin-bottom: 20px;
}

.footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
}

</style>