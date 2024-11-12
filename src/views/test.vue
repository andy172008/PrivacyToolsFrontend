<template>
    <el-container>
      <!-- 只存放一个标题 -->
      <el-header>
        <el-card class="head-title" >隐私采集工具集</el-card>
      </el-header>
      <!-- 主体部分，分为左侧的按钮和右侧的图表 -->
      <el-container>
        <el-aside width="40%">
          <el-card>
            
          </el-card>
        </el-aside>
        <el-main>
          <el-card>

          </el-card>
        </el-main>
      </el-container>
      <!-- 显示输入数据和输出数据 -->
      <el-footer>
        TODO
      </el-footer>
    </el-container>
  </template>
  
  <script>
  
  import axios from 'axios'
  import chart from './privacytools/components/Chart.vue'
  
  export default {
    components: {
      chart
    },
    data() {
      return {
        form: {
          selectedDataType: '',
          isOneMechanism: false,
          mechanism: '',
          epsilon_range: [0.2, 1.0],
          dataset: '',
          realFrequencyData: [
            [0.10, 0.35, 0.15, 0.25, 0.15],  // 第2组真实频率
            [0.25, 0.20, 0.10, 0.15, 0.30],  // 第4组真实频率
            [0.20, 0.10, 0.30, 0.25, 0.15],  // 第3组真实频率
            [0.15, 0.30, 0.20, 0.10, 0.25],  // 第6组真实频率
            [0.10, 0.25, 0.15, 0.35, 0.15],  // 第7组真实频率
            [0.20, 0.15, 0.25, 0.10, 0.30],  // 第8组真实频率
            [0.25, 0.10, 0.30, 0.15, 0.20],  // 第9组真实频率
            [0.30, 0.20, 0.15, 0.25, 0.10]   // 第10组真实频率
            [0.30, 0.15, 0.25, 0.20, 0.10],  // 第5组真实频率
            [0.15, 0.25, 0.20, 0.10, 0.30],  // 第1组真实频率
          ], // 真实数据
          estimatedFrequencyData: [
            [0.13, 0.36, 0.13, 0.23, 0.15],  // 第2个估计数据
            [0.18, 0.10, 0.33, 0.22, 0.17],  // 第3个估计数据
            [0.24, 0.20, 0.12, 0.15, 0.29],  // 第4个估计数据
            [0.31, 0.15, 0.23, 0.20, 0.11],  // 第5个估计数据
            [0.14, 0.28, 0.22, 0.13, 0.23],  // 第6个估计数据
            [0.10, 0.26, 0.14, 0.36, 0.14],  // 第7个估计数据
            [0.21, 0.14, 0.27, 0.12, 0.26],  // 第8个估计数据
            [0.26, 0.11, 0.28, 0.16, 0.19],  // 第9个估计数据
            [0.32, 0.19, 0.14, 0.22, 0.13]   // 第10个估计数据], // 估计数据
            [0.15, 0.23, 0.21, 0.12, 0.29],  // 第1个估计数据
          ],
          labels: [1, 2, 3, 4, 5],//数据域X
        }
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
        formData.append('file', this.form.dataset)
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
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    justify-content: center;
    text-align: center;
  }
  .el-aside {
  /* padding: 20px; */
  border-right: 1px solid #dcdfe6;
  overflow-y: auto;
}

.el-main {
  padding: 20px;
  overflow-y: auto;
}
  </style>
  