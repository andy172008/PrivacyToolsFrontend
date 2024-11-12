<template>
  <div :class="className" :style="{ height: height, width: width }" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    data_t: {
      type: Array,
      required: true
    },
    data_e: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      label_t : '真实频率',
      label_e : '估计频率'
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    data: {
      handler(newValue) {
        this.updateChart();
      },
      deep: true
    },
    labels: {
      handler(newValue) {
        this.updateChart();
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons');
      this.updateChart(); // 初始化时设置图表
    },
    updateChart() {
      if (this.chart) {
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: [this.label_t, this.label_e], // 图例的名称
            top: '-0%', // 设置图例在图表底部
            textStyle: {
              fontSize: 12,
            },
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.labels, // 动态标签
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [
            {
              name: this.label_t,
              type: 'bar',
              barWidth: '40%',
              data: this.data_t, // 动态数据
            },
            {
              name: this.label_e,
              type: 'bar',
              barWidth: '40%',
              data: this.data_e, // 动态数据
            },
          ]
        });
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<style scoped>
.chart {
  margin-top: 20px;
}
</style>
