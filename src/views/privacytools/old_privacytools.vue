<template>
    <div class="container">
      <h1>类别型数据-频率估计</h1>
      <!-- 选择机制用的按钮 -->
      <div class = "button-group">
        <el-button 
        v-for="mechanism in mechanisms_A"
        :key="mechanism.value"
        :type="selectedMechnism === mechanism.value ? 'success' : 'primary'"
        @click="selectMechnism(mechanism.value)"
        style="margin-right: 0px;"
        >
          {{ mechanism.label }}
        </el-button>
      </div>
      <h1>集合型数据-频率估计</h1>
      <div class = "button-group">
        <el-button 
        v-for="mechanism in mechanisms_B"
        :key="mechanism.value"
        :type="selectedMechnism === mechanism.value ? 'success' : 'primary'"
        @click="selectMechnism(mechanism.value)"
        style="margin-right: 0px;"
        >
          {{ mechanism.label }}
        </el-button>
      </div>
      <h1>数值型数据-均值估计</h1>
      <div class = "button-group">
        <el-button 
        v-for="mechanism in mechanisms_C"
        :key="mechanism.value"
        :type="selectedMechnism === mechanism.value ? 'success' : 'primary'"
        @click="selectMechnism(mechanism.value)"
        style="margin-right: 0px;"
        >
          {{ mechanism.label }}
        </el-button>
      </div>
      

      <div class="temp-container">
        <div class="centered">
          <label for="epsilon">隐私预算 (ε): </label>
          <input 
            type="number" 
            v-model="epsilonValue" 
            step="0.1" 
            id="epsilon" 
            placeholder="请输入隐私预算 ε （大于0的浮点数）" 
            class="input"
            style="width: 150px"
          />
        </div>
        <!-- 上传Excel -->
        <div class="centered">
          <label>数据集: </label>
          <upload-excel-component  :before-upload="beforeUpload" />
        </div>
      </div>
      
      
      <p></p>
      <!-- 图像 -->
      <frequency-chart
        :realFrequencyData="realFrequencyData"
        :estimatedFrequencyData="estimatedFrequencyData"
        :mseValue="mseValue"
        :labels="labels"
      />

    </div>
</template>
  
<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue';
import FrequencyChart from './components/FrequencyChart.vue';
import axios from 'axios'
// 下列引用不一定有用
// import FormField from './FormField.vue';
import { ElForm, ElFormItem, ElCard, ElRadioGroup, ElRadioButton, ElButton, ElDialog, ElProgress } from 'element-plus';
// import router from '@/router';
// import { ref, watch } from 'vue';
// import { submitFormData } from '@/api/formSubmission';
// import { useResultStore } from '@/stores/result';

export default {
  name: 'PrivacyTools',
  components: { 
    UploadExcelComponent,
    FrequencyChart
  },
  data() {
    return {
      greetingMessage: '方法名称',
      // 类别型数据-频率估计
      mechanisms_A: [
        { value: 'GRR', label: 'GRR' },
        { value: 'SUE', label: 'SUE' },
        { value: 'OUE', label: 'OUE' },
        { value: 'OLH', label: 'OLH' },
        { value: 'EFM', label: 'EFM' },
        { value: 'FLH', label: 'FLH' },
        { value: 'SS', label: 'SS'},
      ],
      // 集合型数据-频率估计
      mechanisms_B:[
        { value: 'Wheel', label: 'Wheel'},
      ],
      // 数值型数据-均值估计
      mechanisms_C:[
        { value: 'Duchi', label: 'Duchi'},
        { value: 'PM', label: 'PM'},
      ],
      // 当前选中的机制
      selectedMechnism : '',
      epsilonValue: '1', // 初始化 epsilon 值
      realFrequencyData: [], // 真实数据
      estimatedFrequencyData: [], // 估计数据
      labels: [],//数据域X
      mseValue: 0 // 假设这是父组件计算得到的 MSE
    };
  },
  methods: {
    // 选择机制
    selectMechnism(mechanism) {
      this.selectedMechnism = mechanism;
      this.setGreetingMessage('使用'+mechanism)
    },

    beforeUpload(file) {
      console.log(file);
      const formData = new FormData()
      formData.append('file', file)
      // 将 epsilon 值添加到 formData 中
      formData.append('epsilon', this.epsilonValue);
      // 构建动态 URL
      const urlMap = {
        GRR: 'http://localhost:8006/GRR',
        SUE: 'http://localhost:8006/SUE',
        OUE: 'http://localhost:8006/OUE',
        OLH: 'http://localhost:8006/OLH',
        SS: 'http://localhost:8006/SS',
        EFM: 'http://localhost:8006/EFM',
        wheel: 'http://localhost:8006/set_Wheel',
        Duchi: 'http://localhost:8006/numeric_Duchi',
        PM: 'http://localhost:8006/numeric_PM'
      };

      const url = urlMap[this.selectedMechnism]
      console.log(url)

      if (url) {
        // 使用动态url发送请求
        axios.post(url, formData)
          .then(response => {
            console.log(response.data);
            this.realFrequencyData = response.data.true;
            this.estimatedFrequencyData = response.data.estimated;
            this.mseValue = response.data.mse;
            this.labels = response.data.domain;
          })
          .catch(errpr => {
            console.error('107上传失败');
            alert("服务器内部错误")
          });
        return true
      }

      // 如果没有找到对应的 URL
      console.error('Selected mechanism is invalid');
      alert("未选择机制");
      return false;

    },
    // 我们在beforeUpload中就将数据放到了表格中，因此这里就不用这个函数了
    handleSuccess({ results, header }) {
      //this.tableData = results
      //this.tableHeader = header
    },
    setGreetingMessage(s) {
      this.greetingMessage = s
    },
  },
};
</script>
  

  

<style scoped>
body {
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  /* max-width: 600px; */
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(52, 144, 220, 0.3);
}

.btn:hover {
  background-color: #2779bd;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(52, 144, 220, 0.4);
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.file-upload {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.file-upload:hover {
  border-color: #3490dc;
  background-color: #f0f7ff;
}

.upload-btn {
  margin-top: 10px;
}
.temp-container{
  display: flex;
  gap:20px;
}
.centered {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  margin-bottom: 10px;    
}

</style>