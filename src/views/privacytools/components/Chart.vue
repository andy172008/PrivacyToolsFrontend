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
  name: 'ComparisonCharts',
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
        title: {
          text: this.chartData.title,
          left: 'center'
        },
        // 图表的标题和位置
        tooltip: {
          trigger: 'axis'
        },
        // 提示框，显示详细数据
        legend: {
          data: ['真实频率', this.chartData.mechanismName1, this.chartData.mechanismName2],
          top: '10%'
        },
        // 图例，显示各数据集的标识
        xAxis: {
          type: 'category',
          data: this.chartData.label1,
          axisTick: {
            show: false
          }
        },
        // X 轴，类别类型，数据来源于 props.label1
        yAxis: {
          type: 'value'
        },
        // Y 轴，数值类型
        series: [
          {
            name: '真实频率',
            type: 'bar',
            data: this.chartData.realFrequency
          },
          // 真实频率的数据柱状图
          {
            name: this.chartData.mechanismName1,
            type: 'bar',
            data: this.chartData.estimatedFrequency1
          },
          // 估计频率 1 的数据柱状图
          ...(this.chartData.estimatedFrequency2.length > 0 ? [{
            name: this.chartData.mechanismName2,
            type: 'bar',
            data: this.chartData.estimatedFrequency2,
          }] : [])
          // 估计频率 2 的数据柱状图
        ]
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
        title: {
          text: 'MSE 比较',
          left: 'center'
        },
        // 图表的标题和位置
        tooltip: {
          trigger: 'axis'
        },
        // 提示框，显示详细数据
        legend: {
          data: [this.chartData.mechanismName1, this.chartData.mechanismName2],
          top: '10%'
        },
        // 图例，显示各数据集的标识
        xAxis: {
          type: 'category',
          data: this.chartData.label2,
          axisTick: {
            show: false
          }
        },
        // X 轴，类别类型，数据来源于 props.label2
        yAxis: {
          type: 'log', // 将 Y 轴改为对数坐标轴
        },
        // Y 轴，数值类型
        series: [
          {
            name: this.chartData.mechanismName1,
            type: 'line',
            data: this.chartData.mse1
          },
          // MSE 1 的数据折线图
          ...(this.chartData.mse2.length > 0 ? [{
            name: this.chartData.mechanismName2,
            type: 'line',
            data: this.chartData.mse2,
          }] : [])
          // MSE 2 的数据折线图
        ]
      };
      this.lineChart.setOption(lineOption, true);
      // 设置折线图的配置项
    },
    updateChart() {
      console.log('子组件中更新图表')
      // 更新图表的逻辑，比如重新调用绘图函数
      this.barChart.clear();
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
