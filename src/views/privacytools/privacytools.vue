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
              <el-switch v-model="form.isOneMechanism" inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #49b9ff" active-text="机制比较"
                inactive-text="单个机制" />
            </div>
          </el-card>
          <el-card class="card">
            <!-- 类别型数据机制选择 -->
            <!-- 单选 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'categorical data'">
              <el-radio-button label="GRR" value="GRR" />
              <el-radio-button label="SUE" value="SUE" />
              <el-radio-button label="OUE" value="OUE" />
              <el-radio-button label="OLH" value="OLH" />
              <el-radio-button label="EFM" value="EFM" />
              <el-radio-button label="FLH" value="FLH" />
              <el-radio-button label="SS" value="SS" />
            </el-radio-group>
            <!-- 多选 -->
            <!-- <el-checkbox-group 
      v-model="form.categorical_mechanism" 
      v-show="form.selectedDataType === 'categorical data'"
      :max="2"
    >
      <el-checkbox-button label="GRR" value="GRR" />
      <el-checkbox-button label="SUE" value="SUE" />
      <el-checkbox-button label="OUE" value="OUE" />
      <el-checkbox-button label="OLH" value="OLH" />
      <el-checkbox-button label="EFM" value="EFM" />
      <el-checkbox-button label="FLH" value="FLH" />
      <el-checkbox-button label="SS" value="SS" />
    </el-checkbox-group> -->

            <!-- 数值型数据机制选择 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'numerical data'">
              <el-radio-button label="Duchi" value="Duchi" />
              <el-radio-button label="PM" value="PM" />
            </el-radio-group>
            <!-- 集合数据机制选择 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'set data'">
              <el-radio-button label="Wheel" value="Wheel" />
            </el-radio-group>
            <!-- 键值对数据机制选择 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'key-value data'">
              <el-radio-button label="PCKV-GRR" value="PCKV-GRR" />
              <el-radio-button label="PCKV-UE" value="PCKV-UE" />
            </el-radio-group>
            <!-- 位置数据机制选择 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'location data'">
              <el-radio-button label="Tang" value="Tang" />
            </el-radio-group>
            <!-- 有序数据机制选择 -->
            <el-radio-group v-model="form.mechanism" v-show="form.selectedDataType === 'order data'">
              <el-radio-button label="Jin" value="Jin" />
            </el-radio-group>
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
              <el-upload :auto-upload="false" :on-change="handleChange" :limit="1">
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
          <chart 
            :labels="labels" 
            :realFrequency="realFrequency" 
            :estimatedFrequency1="estimatedFrequency1"
            :estimatedFrequency2="estimatedFrequency2" 
            :mse1="mse1" 
            :mse2="mse2" 
          />
        </el-card>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

import axios from 'axios'
import chart from './components/Chart.vue'

export default {
  components: {
    chart
  },
  data() {
    return {
      form: {
        selectedDataType: 'categorical data',
        isOneMechanism: false,
        mechanism: '',
        epsilon_range: [0.2, 1.0],
        dataset: '',
      },
      // 这些是传给图像组件的变量
      // 每个柱子下的标签，domain
      labels: ['A', 'B', 'C', 'D', 'E'],
      realFrequency: [0.10, 0.20, 0.30, 0.40, 0.50],
      estimatedFrequency1: [0.12, 0.18, 0.28, 0.35, 0.53],
      estimatedFrequency2: [0.11, 0.21, 0.29, 0.39, 0.51],
      mse1: [1.5, 2.2, 1.8, 3.0, 1.0],
      mse2: [1.0, 1.8, 1.5, 2.5, 1.2],
    }
  },
  methods: {
    handleChange(file) {
      // 保存原始文件对象
      this.form.dataset = file.raw
    },
    submitUpload() {
      console.log(this.form.dataset)
      const formData = new FormData()
      // 加入数据集
      formData.append('file', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon', this.form.epsilon_range)
      // 使用 forEach 查看 formData 内容
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const url = 'http://localhost:8006/' + this.form.mechanism
      console.log(url)
      if (url) {
        // 使用动态url发送请求
        axios.post(url, formData)
          .then(response => {
            console.log(response.data);
            this.form.realFrequencyData = response.data.true;
            this.form.estimatedFrequencyData = response.data.estimated;
            this.form.labels = response.data.domain;
          })
          .catch(errpr => {
            console.error('107上传失败');
            alert("服务器内部错误")
          });
      }
    }
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
