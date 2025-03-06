<template>
  <!-- 定义模板部分 -->
  <div>
    <!-- 定义容器div -->
    <div id="bar-chart" style="width: 100%; aspect-ratio: 16/9;"></div>
    <!-- 用于展示柱状图的容器，设定了高度 -->
    <div id="line-chart" style="width: 100%; aspect-ratio: 16/9;"></div>
    <!-- 用于展示折线图的容器，设定了高度并增加了顶部外边距 -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
// 导入 ECharts 库

export default {
  name: 'set_charts',
  // 组件的名称，方便在其他地方引用
  props: {
    chartData: {
      type: Object,
      required: true, // 必须传递
    },
  },
  mounted() {
    // 组件挂载后初始化图表
    this.barChart = echarts.init(document.getElementById('bar-chart'));
    this.lineChart = echarts.init(document.getElementById('line-chart'));
    // 调用绘图方法
    this.renderBarChart();
    this.renderLineChart();
  },
  methods: {
    renderBarChart() {
      const barOption = {
        grid: {
          top: 100,  // 增加顶部留白
          bottom: 50,
          left: '10%',
          right: '10%',
        },
        // 图表的标题和位置
        title: {
          text: "真实频率与估计频率比较",
          left: 'center'
        },
        // 提示框，显示详细数据
        tooltip: {
          trigger: 'axis'
        },
        // 图例
        legend: {
          data: this.chartData.series_frequency.map(item => item.name),
          top: '10%'
        },
        // X 轴
        xAxis: {
          type: 'category',
          data: this.chartData.label_frequency,
          axisTick: {
            show: false
          }
        },
        
        yAxis: {
          type: 'value'
        },
        // Y 轴，数值类型
        series: this.chartData.series_frequency.map(item => ({
          name: item.name, // 动态名称
          type: 'bar', // 柱状图类型
          data: item.data, // 动态数据
        })),
      };
      this.barChart.setOption(barOption, true);
      // 设置柱状图的配置项
    },
    renderLineChart() {
      const lineOption = {
        grid: {
          top: 100,  // 增加顶部留白
          bottom: 50,
          left: '10%',
          right: '10%',
        },
        // 图表的标题和位置
        title: {
          text: '均方误差',
          left: 'center'
        },
        // 提示框，显示详细数据
        tooltip: {
          trigger: 'axis'
        },
        // 图例
        legend: {
          data: this.chartData.series_mse.map(item => item.name),
          top: '10%'
        },
        // X 轴
        xAxis: {
          type: 'category',
          data: this.chartData.label_mse,
          axisTick: {
            show: false
          }
        },
        // Y 轴，数值类型
        yAxis: {
          type: 'log', // 将 Y 轴改为对数坐标轴
        },
        series: this.chartData.series_mse.map(item => ({
          name: item.name, // 动态名称
          type: 'line', // 柱状图类型
          data: item.data, // 动态数据
        })),
      };
      this.lineChart.setOption(lineOption, true);
      // 设置折线图的配置项
    },
    updateChart() {
      // 更新图表的逻辑，比如重新调用绘图函数
      this.renderBarChart();
      // 渲染柱状图
      this.renderLineChart();
      // 渲染折线图

    },
    beforeDestroy() {
      // 在组件销毁前，销毁图表实例，防止内存泄漏
      if (this.barChart) {
        this.barChart.dispose();
      }
      if (this.lineChart) {
        this.lineChart.dispose();
      }
    }
  }
};
</script>

<style scoped>
/* 设定组件的局部样式 */
#bar-chart,
#line-chart {
  width: 100%;
  /* 确保图表宽度为100%以适应容器 */
}
</style>