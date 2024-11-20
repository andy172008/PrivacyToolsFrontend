<template>
  <el-container>
    <!-- 只存放一个标题 -->
    <el-header style="height: 100px;">
      <el-card style="height: 100%;" class="head-title">隐私采集工具集</el-card>
    </el-header>
    <!-- 主体部分，分为左侧的按钮和右侧的图表 -->
    <el-container>
      <el-aside width="50%">
        <el-form :model="form" label-width="auto">
          <el-card class="card">
            <div class="div-content">
              <!-- 选择6种类别 -->
              <el-radio-group v-model="form.selectedDataType">
                <el-radio-button label="类别型数据" value="categorical data" />
                <el-radio-button label="数值型数据" value="numerical data" />
                <el-radio-button label="集合数据" value="set data" />
                <el-radio-button label="键值对数据" value="key-value data" />
                <el-radio-button label="位置数据" value="location data" />
                <el-radio-button label="有序数据" value="order data" />
              </el-radio-group>
              <!-- 选择单个机制还是两个机制进行比较 -->
              <el-switch v-model="form.isTwoMechanism" inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #49b9ff" active-text="机制比较"
                inactive-text="单个机制" />
            </div>
          </el-card>
          <el-card class="card">
            <!-- 类别型数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism"
              v-show="form.selectedDataType === 'categorical data' && !form.isTwoMechanism">
              <el-radio-button label="GRR" value="GRR" />
              <el-radio-button label="SUE" value="SUE" />
              <el-radio-button label="OUE" value="OUE" />
              <el-radio-button label="OLH" value="OLH" />
              <el-radio-button label="EFM" value="EFM" />
              <el-radio-button label="SS" value="SS" />
            </el-radio-group>
            <!-- 多选 -->
            <el-checkbox-group v-model="form.two_mechanisms"
              v-show="form.selectedDataType === 'categorical data' && form.isTwoMechanism" :max="2">
              <el-checkbox-button label="GRR" value="GRR" />
              <el-checkbox-button label="SUE" value="SUE" />
              <el-checkbox-button label="OUE" value="OUE" />
              <el-checkbox-button label="OLH" value="OLH" />
              <el-checkbox-button label="EFM" value="EFM" />
              <el-checkbox-button label="SS" value="SS" />
            </el-checkbox-group>

            <!-- 数值型数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism"
              v-show="form.selectedDataType === 'numerical data' && !form.isTwoMechanism">
              <el-radio-button label="Duchi" value="Duchi" />
              <el-radio-button label="PM" value="PM" />
            </el-radio-group>
            <!-- 多选 -->
            <el-checkbox-group v-model="form.two_mechanisms"
              v-show="form.selectedDataType === 'numerical data' && form.isTwoMechanism" :max="2">
              <el-checkbox-button label="Duchi" value="Duchi" />
              <el-checkbox-button label="PM" value="PM" />
            </el-checkbox-group>

            <!-- 集合数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'set data'">
              <el-radio-button label="Wheel" value="Wheel" />
            </el-radio-group>
            <!-- 多选 -->

            <!-- 键值对数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism"
              v-show="form.selectedDataType === 'key-value data' && !form.isTwoMechanism">
              <el-radio-button label="PCKV-GRR" value="PCKV-GRR" />
              <el-radio-button label="PCKV-UE" value="PCKV-UE" />
            </el-radio-group>
            <!-- 多选 -->
            <el-checkbox-group v-model="form.two_mechanisms"
              v-show="form.selectedDataType === 'key-value data' && form.isTwoMechanism">
              <el-checkbox-button label="PCKV-GRR" value="PCKV-GRR" />
              <el-checkbox-button label="PCKV-UE" value="PCKV-UE" />
            </el-checkbox-group>

            <!-- 位置数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'location data'">
              <el-radio-button label="Tang" value="Tang" />
            </el-radio-group>
            <!-- 多选 -->

            <!-- 有序数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism"
              v-show="form.selectedDataType === 'order data' && !form.isTwoMechanism">
              <el-radio-button label="Jin" value="Jin" />
              <el-radio-button label="yelse" value="yelse" />
            </el-radio-group>
            <!-- 多选 -->
            <el-checkbox-group v-model="form.two_mechanisms"
              v-show="form.selectedDataType === 'order data' && form.isTwoMechanism">
              <el-checkbox-button label="Jin" value="Jin" />
              <el-checkbox-button label="yelse" value="yelse" />
            </el-checkbox-group>
          </el-card>
          <el-card class="card">
            <!-- 隐私预算 -->
            <div class="div-content">
              <span>隐私预算</span>
              <el-slider v-model="form.epsilon_range" range :min="0" :max="3" :step="0.2" />
            </div>
          </el-card>
          <el-card class="card">
            <!-- 上传文件 -->
            <div class="div-content" style="justify-content: center">
              <el-upload :auto-upload="false" :on-exceed="handleExceed" :on-change="handleChange" :limit="1"
                ref="upload">
                <template #trigger>
                  <el-button type="primary" class="upload-button">选择文件</el-button>
                </template>
                <el-button style="margin-left: 20px;" type="success" @click="submitUpload">
                  上传文件
                </el-button>
              </el-upload>
            </div>
          </el-card>
        </el-form>

      </el-aside>
      <el-main>
        <el-card>
          <!-- 图像 -->
          <chart ref="twoCharts" :title="title" :label1="label1" :label2="label2" :mechanismName1="mechanismName1"
            :mechanismName2="mechanismName2" :realFrequency="realFrequency" :estimatedFrequency1="estimatedFrequency1"
            :estimatedFrequency2="estimatedFrequency2" :mse1="mse1" :mse2="mse2" />
        </el-card>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

import axios from 'axios'
import chart from './components/Chart.vue'
import { genFileId } from 'element-plus'

export default {
  components: {
    chart
  },
  data() {
    return {
      form: {
        selectedDataType: 'categorical data',
        isTwoMechanism: false,
        mechanism: '', //单个机制
        two_mechanisms: [], //多个机制
        epsilon_range: [0.2, 1.0],
        dataset: '',
      },
      // 这些是传给图像组件的变量
      title: '图像',
      label1: ['A', 'B', 'C', 'D', 'E'],
      label2: ['A', 'B', 'C', 'D', 'E'],
      mechanismName1: '示例1',
      mechanismName2: '示例2',
      realFrequency: [0.10, 0.20, 0.30, 0.40, 0.50],
      estimatedFrequency1: [0.12, 0.18, 0.28, 0.35, 0.53],
      estimatedFrequency2: [0.12, 0.18, 0.28, 0.35, 0.53],
      mse1: [1.5, 2.2, 1.8, 3.0, 1.0],
      mse2: [1.0, 1.8, 1.5, 2.5, 1.2],
    }
  },
  watch: {
    // 监听数据类别，一旦更改，清除多选框的选择
    'form.selectedDataType'() {
      this.form.two_mechanisms = []
    },
  },
  methods: {
    handleChange(file) {
      // 保存原始文件对象
      this.form.dataset = file.raw
      console.log('触发change，当前文件为')
      console.log(this.form.dataset)
    },
    handleExceed(files) {
      console.log('触发了handleExceed函数')
      this.$refs.upload.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      this.$refs.upload.handleStart(file)
    },
    // 这只是一个中转函数，根据当前用户的选择不同执行不同的函数
    submitUpload() {
      if (!this.form.isTwoMechanism) {
        // 单个机制
        if (this.form.selectedDataType === 'categorical data') {
          this.categorical_one()
        } else if (this.form.selectedDataType === 'numerical data') {
          this.numerical_one()
        } else if (this.form.selectedDataType === 'set data') {
          this.set_one()
        } else if (this.form.selectedDataType === 'key-value data') {
          this.key_value_one()
        } else if (this.form.selectedDataType === 'location data') {
          this.location_one()
        } else if (this.form.selectedDataType === 'order data') {
          this.order_one()
        } else {
          console.log('错误，未匹配任何数据类别')
        }
      } else {
        // 多重比较
        if (this.form.selectedDataType === 'categorical data') {
          this.categorical_two()
        } else if (this.form.selectedDataType === 'numerical data') {
          this.numerical_two()
        } else if (this.form.selectedDataType === 'set data') {
          this.set_two()
        } else if (this.form.selectedDataType === 'key-value data') {
          this.key_value_two()
        } else if (this.form.selectedDataType === 'location data') {
          this.location_two()
        } else if (this.form.selectedDataType === 'order data') {
          this.order_two()
        } else {
          console.log('错误，未匹配任何数据类别')
        }
      }
    },
    categorical_one() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('mechanism', this.form.mechanism)
      // 发送请求
      axios.post('http://localhost:8006/categorical_one', formData)
        .then(response => {
          this.title = '真实频率与估计频率比较'
          this.label1 = response.data.domain;
          this.label2 = response.data.epsilon_list;
          this.mechanismName1 = this.form.mechanism;
          this.mechanismName2 = ''
          this.realFrequency = response.data.true;
          this.estimatedFrequency1 = response.data.estimated;
          this.estimatedFrequency2 = [];
          this.mse1 = response.data.mse
          this.mse2 = []
          this.$nextTick(() => {
            this.$refs.twoCharts.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("服务器内部错误")
        });

    },
    categorical_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('mechanism1', this.form.two_mechanisms[0])
      formData.append('mechanism2', this.form.two_mechanisms[1])
      // 发送请求
      axios.post('http://localhost:8006/categorical_two', formData)
        .then(response => {
          this.title = '真实频率与估计频率比较'
          this.label1 = response.data.domain;
          this.label2 = response.data.epsilon_list;
          this.mechanismName1 = this.form.two_mechanisms[0];
          this.mechanismName2 = this.form.two_mechanisms[1];
          this.realFrequency = response.data.true;
          this.estimatedFrequency1 = response.data.estimated1;
          this.estimatedFrequency2 = response.data.estimated2;
          this.mse1 = response.data.mse1
          this.mse2 = response.data.mse2
          this.$nextTick(() => {
            this.$refs.twoCharts.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("服务器内部错误")
        });
    },
    numerical_one() {

    },
    numerical_two() {

    },
    set_one() {

    },
    set_two() {

    },
    key_value_one() {

    },
    key_value_two() {

    },
    location_one() {

    },
    location_two() {

    },
    order_one() {

    },
    order_two() {

    },
  }
}
</script>

<style scoped>
.head-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  justify-content: center;
  text-align: center;
  /* height: 200px; */
}

.el-aside {
  padding: 20px;
  /* border-right: 1px solid #dcdfe6; */
  overflow-y: auto;
}

.el-main {
  padding: 20px;
  overflow-y: auto;
}

.card {
  margin-bottom: 40px;

}

.div-content {
  height: 100%;
  display: flex;
  /* 使用 flexbox 布局 */
  /* justify-content: center;      水平居中对齐 */
  align-items: center;
  /* 垂直居中对齐 */
  gap: 36px;
  /* 控制子元素之间的空隙，16px 可根据需要调整 */
  flex-wrap: wrap;
  /* 如果内容过多，允许换行 */
  /* padding: 20px;                给容器添加适当的内边距 */
}

.el-slider {
  width: 70%;
  /* 显式指定滑块的宽度 */
}
</style>
