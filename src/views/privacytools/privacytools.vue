<template>
  <el-container>
    <!-- 只存放一个标题 -->
    <el-header style="height: 100px;">
      <el-card style="height: 100%;" class="head-title">隐私采集工具集</el-card>
    </el-header>
    <!-- 主体部分，分为左侧的按钮和右侧的图像 -->
    <el-container>
      <!-- 左侧按钮 -->
      <el-aside width="50%">
        <el-form :model="form" label-width="auto">
          <!-- 数据类别选择 -->
          <el-card class="card">
            <div class="div-content">
              <span style="font-weight: bold;">数据类别</span>
              <div class="div-content" style="gap: 0;">
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第一类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button label="类别数据" value="categorical data" />
                  </el-radio-group>
                </div>
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第二类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button style="--el-border-radius-base:0px;" label="数值数据" value="numerical data" />
                  </el-radio-group>
                </div>
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第三类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button style="--el-border-radius-base:0px;" label="集合数据" value="set data" />
                  </el-radio-group>
                </div>
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第四类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button style="--el-border-radius-base:0px;" label="键值对数据" value="key-value data" />
                  </el-radio-group>
                </div>
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第五类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button style="--el-border-radius-base:0px;" label="位置数据" value="location data" />
                  </el-radio-group>
                </div>
                <div style="margin-bottom: 10px; text-align: center;">
                  <div>第六类</div>
                  <el-radio-group v-model="form.selectedDataType">
                    <el-radio-button style="--el-border-radius-base:0px;" label="有序数据" value="order data" />
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 具体机制选择 -->
          <el-card class="card">
            <div class="div-content">
              <span style="font-weight: bold;">机制选择</span>

              <el-switch v-model="form.isTwoMechanism" inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #49b9ff" active-text="机制比较"
                inactive-text="单个机制" />
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
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'set data' && !form.isTwoMechanism">
                <el-radio-button label="Wheel" value="Wheel" />
                <el-radio-button label="PrivSet" value="PrivSet" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanism"
                v-show="form.selectedDataType === 'set data' && form.isTwoMechanism">
                <el-checkbox-button label="Wheel" value="Wheel" />
                <el-checkbox-button label="PrivSet" value="PrivSet" />
              </el-checkbox-group>

              <!-- 键值对数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'key-value data' && !form.isTwoMechanism">
                <el-radio-button label="PCKVGRR" value="PCKVGRR" />
                <el-radio-button label="PCKVUE" value="PCKVUE" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'key-value data' && form.isTwoMechanism">
                <el-checkbox-button label="PCKVGRR" value="PCKVGRR" />
                <el-checkbox-button label="PCKVUE" value="PCKVUE" />
              </el-checkbox-group>

              <!-- 位置数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'location data' && !form.isTwoMechanism">
                <el-radio-button label="GBCUG" value="GBCUG" />
                <el-radio-button label="PL" value="PL" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanism"
                v-show="form.selectedDataType === 'location data' && form.isTwoMechanism">
                <el-checkbox-button label="GBCUG" value="GBCUG" />
                <el-checkbox-button label="PL" value="PL" />
              </el-checkbox-group>

              <!-- 有序数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'order data' && !form.isTwoMechanism">
                <el-radio-button label="EM" value="EM" />
                <el-radio-button label="GEM" value="GEM" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'order data' && form.isTwoMechanism">
                <el-checkbox-button label="EM" value="EM" />
                <el-checkbox-button label="GEM" value="GEM" />
              </el-checkbox-group>
            </div>

          </el-card>

          <!-- 隐私预算选择 -->
          <el-card class="card">
            <div class="div-content">
              <span style="font-weight: bold;">隐私预算</span>
              <el-slider v-model="form.epsilon_range" range :min="0" :max="3" :step="0.2" />
            </div>
          </el-card>

          <!-- 输入与执行 -->
          <el-card class="card">
            <!-- 数据集输入 -->
            <span style="font-weight: bold; display: block; text-align: center;">数据集输入</span>
            <div class="div-content" style="justify-content: center;margin-top: 10px;">
              <el-upload :auto-upload="false" :on-exceed="handleExceed" :on-change="handleChange" :limit="1"
                ref="upload">
                <template #trigger>
                  <el-button type="primary" class="upload-button">选择数据集文件</el-button>
                </template>
                <el-button style="margin-left: 30px;" type="success" @click="submitUpload">
                  上传文件并执行
                </el-button>
              </el-upload>
            </div>
            <!-- 分割线 -->
            <el-divider class="custom-divider"></el-divider>
            <!-- 单个数据输入 -->
            <span style="font-weight: bold; display: block; text-align: center;">单条数据输入</span>
            <!-- 输入和输出框 -->
            <div class="div-content" style="justify-content: center;margin-top: 10px;">
              <div class="div-content" style="gap:0 0px">
                <span>原始数据：</span>
                <el-input v-model="input" style="width: 200px" placeholder="请输入单条原始数据" />
              </div>
              <div class="div-content" style="gap:0 0px">
                <span>扰动数据：</span>
                <el-input v-model="input" style="width: 200px" disabled placeholder="" />
              </div>
            </div>
            <!-- 两个按钮 -->
            <div class="div-content" style="justify-content: center;margin-top: 20px;gap:0 18px">
              <el-button type="warning">扰动数据</el-button>
              <el-button type="warning">聚合数据</el-button>
            </div>

          </el-card>

          <!-- 下载源码 -->
          <el-card class="card">
            <div class="div-content" style="justify-content: center;gap:0 30px">
              <div class="div-content" style="justify-content: center;gap:0 30px">
                <a href="/LDPtool.py" download="LDPtool.py">
                  <el-button type="warning">下载工具集代码</el-button>
                </a>
              </div>
            </div>
          </el-card>

        </el-form>
      </el-aside>

      <!-- 右侧图像 -->
      <el-main>
        <el-card>
          <div v-if="form.selectedDataType === 'categorical data'">
            <chart ref="twoCharts" :chartData="chartData_categorical" />
          </div>
          <div v-if="form.selectedDataType != 'categorical data'">
            <chart :chartData="chartData_categorical" />
          </div>
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
      chartData_categorical: {
        title: "真实频率与估计频率比较", // 图表标题
        label1: ["A", "B", "C", "D"], // X轴标签
        label2: [1, 2, 3, 4], // MSE 图的标签
        mechanismName1: "机制1", // 第一个机制的名称
        mechanismName2: "机制2", // 第二个机制的名称（可选）
        realFrequency: [0.2, 0.3, 0.4, 0.1], // 真实频率
        estimatedFrequency1: [0.22, 0.28, 0.35, 0.15], // 估计频率1
        estimatedFrequency2: [0.18, 0.33, 0.38, 0.1], // 估计频率2（可选）
        mse1: [0.01, 0.02, 0.03, 0.01], // MSE数据1
        mse2: [0.015, 0.025, 0.035, 0.02], // MSE数据2（可选）
      },
      server_url: 'http://124.223.171.19:8006',
      // server_url: 'http://localhost:8006',
    }
  },
  watch: {
    // 监听数据类别，一旦更改，清除单选/多选框的选择
    'form.selectedDataType'() {
      this.form.mechanism = ''
      this.form.two_mechanisms = []
    },
    'form.isTwoMechanism'() {
      this.form.mechanism = ''
      this.form.two_mechanisms = []
    }
  },
  methods: {
    handleChange(file) {
      // 保存原始文件对象
      this.form.dataset = file.raw
    },
    handleExceed(files) {
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
    // 单个类别型数据机制
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
      const post_url = this.server_url + '/categorical_one'
      axios.post(post_url, formData)
        .then(response => {
          this.chartData_categorical.title = '真实频率与估计频率比较'
          this.chartData_categorical.label1 = response.data.domain;
          this.chartData_categorical.label2 = response.data.epsilon_list;
          this.chartData_categorical.mechanismName1 = this.form.mechanism;
          this.chartData_categorical.mechanismName2 = ''
          this.chartData_categorical.realFrequency = response.data.true;
          this.chartData_categorical.estimatedFrequency1 = response.data.estimated;
          this.chartData_categorical.estimatedFrequency2 = [];
          this.chartData_categorical.mse1 = response.data.mse
          this.chartData_categorical.mse2 = []
          this.$nextTick(() => {
            this.$refs.twoCharts.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("服务器内部错误")
        });
      // this.$refs.upload.clearFiles();
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
      axios.post('http://localhost:8006/numerical_one', formData)
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
  gap: 0 36px;
  /* 控制子元素之间的空隙，16px 可根据需要调整 */
  flex-wrap: wrap;
  /* 如果内容过多，允许换行 */
  /* padding: 20px;                给容器添加适当的内边距 */
}

.el-slider {
  width: 70%;
  /* 显式指定滑块的宽度 */
}

.button-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  /* 圆角边框 */
  background-color: #f9f9f9;
  /* 背景颜色 */
}

.button-row {
  margin-bottom: 0px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-divider {
  margin-top: 10px;
  /* 上间距设置为 5px */
  margin-bottom: 15px;
  /* 下间距设置为 20px */
}
</style>
