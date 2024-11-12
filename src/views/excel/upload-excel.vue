<template>
  <div class="app-container">
    <!-- 页面问候语 -->
    <div class="page-greeting">{{ greetingMessage }}</div>
    <!-- 上传Excel组件 -->
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <!-- 数据表格 -->
    <el-table :data="tableData" border highlight-current-row style="width: 100%; margin-top: 20px;">
      <el-table-column v-for="item in tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import axios from 'axios'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      greetingMessage: '' // 用于存储不同页面的提示语
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      const routeName = this.$route.name
      if (routeName === 'categorical_GRR') {
        axios.post('http://localhost:8006/GRR', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      }else if (routeName === 'categorical_SUE') {
        axios.post('http://localhost:8006/SUE', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'categorical_OUE') {
        axios.post('http://localhost:8006/OUE', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'categorical_OLH') {
        axios.post('http://localhost:8006/OLH', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'categorical_SS') {
        axios.post('http://localhost:8006/SS', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'categorical_EFM') {
        axios.post('http://localhost:8006/EFM', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'set_wheel') {
        axios.post('http://localhost:8006/set_wheel', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'numeric_Duchi') {
        axios.post('http://localhost:8006/numeric_Duchi', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } else if (routeName === 'numeric_PM') {
        axios.post('http://localhost:8006/numeric_PM', formData)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.d
          this.tableHeader = response.data.h
          // 在这里可以处理上传成功后的逻辑
        })
        .catch(error => {
          console.error(error)
          // 上传失败
        })
      return true
      } 
    },
    handleSuccess({ results, header }) {
      //this.tableData = results
      //this.tableHeader = header
    },
    
    setGreetingMessage() {
      const routeName = this.$route.name
      if (routeName === 'categorical_GRR') {
        this.greetingMessage = '欢迎使用 GRR 算法'
      } else if (routeName === 'categorical_SUE') {
        this.greetingMessage = '欢迎使用 SUE 算法'
      } else if (routeName === 'categorical_OUE') {
        this.greetingMessage = '欢迎使用 OUE 算法'
      } else if (routeName === 'categorical_OLH') {
        this.greetingMessage = '欢迎使用 OLH 算法'
      } else if (routeName === 'categorical_SS') {
        this.greetingMessage = '欢迎使用 SS 算法'
      } else if (routeName === 'categorical_EFM') {
        this.greetingMessage = '欢迎使用 EFM 算法'
      } else if (routeName === 'set_wheel') {
        this.greetingMessage = '欢迎使用 WHEEL 算法'
      } else if (routeName === 'numeric_Duchi') {
        this.greetingMessage = '欢迎使用 Duchi 算法'
      } else if (routeName === 'numeric_PM') {
        this.greetingMessage = '欢迎使用 PM 算法'
      } 
    }
  },
  mounted() {
    this.setGreetingMessage()
  },
  watch: {
    $route() {
      this.setGreetingMessage()
      this.tableData = [];
      this.tableHeader = [];
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.page-greeting {
  font-size: 1.5em;
  margin-bottom: 20px;
}
</style>
