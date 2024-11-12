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
    labels: {
      type: Array,
      required: true
    },
    // 传入的 X 轴标签数据
    realFrequency: {
      type: Array,
      required: true
    },
    // 传入的真实频率数据
    estimatedFrequency1: {
      type: Array,
      required: true
    },
    // 传入的估计频率数据 1
    estimatedFrequency2: {
      type: Array,
      required: false,
      default: () => []
    },
    // 传入的估计频率数据 2
    mse1: {
      type: Array,
      required: true
    },
    // 传入的 MSE 数据 1
    mse2: {
      type: Array,
      required: false,
      default: () => []
    }
    // 传入的 MSE 数据 2
  },
  mounted() {
    // 组件挂载后调用绘图方法
    this.renderBarChart();
    // 渲染柱状图
    this.renderLineChart();
    // 渲染折线图
  },
  methods: {
    renderBarChart() {
      // 绘制柱状图的方法
      const barChart = echarts.init(document.getElementById('bar-chart'));
      // 初始化柱状图，绑定到 id 为 'bar-chart' 的 DOM 元素
      const barOption = {
        grid: {
          top: 100,  // 增加顶部留白
          bottom: 50,
          left: '10%',
          right: '10%',
        },
        title: {
          text: '实际数据与估计数据的对比',
          left: 'center'
        },
        // 图表的标题和位置
        tooltip: {
          trigger: 'axis'
        },
        // 提示框，显示详细数据
        legend: {
          data: ['真实频率', '估计频率 1', '估计频率 2'],
          top: '10%'
        },
        // 图例，显示各数据集的标识
        xAxis: {
          type: 'category',
          data: this.labels
        },
        // X 轴，类别类型，数据来源于 props.labels
        yAxis: {
          type: 'value'
        },
        // Y 轴，数值类型
        series: [
          {
            name: '真实频率',
            type: 'bar',
            data: this.realFrequency
          },
          // 真实频率的数据柱状图
          {
            name: '估计频率 1',
            type: 'bar',
            data: this.estimatedFrequency1
          },
          // 估计频率 1 的数据柱状图
          ...(this.estimatedFrequency2.length > 0 ? [{
            name: '估计频率 2',
            type: 'bar',
            data: this.estimatedFrequency2,
          }] : [])
          // 估计频率 2 的数据柱状图
        ]
      };
      barChart.setOption(barOption);
      // 设置柱状图的配置项
    },
    renderLineChart() {
      // 绘制折线图的方法
      const lineChart = echarts.init(document.getElementById('line-chart'));
      // 初始化折线图，绑定到 id 为 'line-chart' 的 DOM 元素
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
          data: ['MSE 1', 'MSE 2'],
          top: '10%'
        },
        // 图例，显示各数据集的标识
        xAxis: {
          type: 'category',
          data: this.labels
        },
        // X 轴，类别类型，数据来源于 props.labels
        yAxis: {
          type: 'value'
        },
        // Y 轴，数值类型
        series: [
          {
            name: 'MSE 1',
            type: 'line',
            data: this.mse1
          },
          // MSE 1 的数据折线图
          ...(this.mse2.length > 0 ? [{
            name: 'MSE 2',
            type: 'line',
            data: this.mse2,
          }] : [])
          // MSE 2 的数据折线图
        ]
      };
      lineChart.setOption(lineOption);
      // 设置折线图的配置项
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
