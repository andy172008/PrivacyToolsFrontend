<template>
  <el-container>
    <!-- 只存放一个标题 -->
    <el-header style="height: 100px;">
      <el-card style="height: 100%;" class="head-title">隐私信息采集工具集</el-card>
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
              <div>
                <div class="div-content" style="gap: 0;">
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第一类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="类别数据" value="categorical data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第二类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="敏感度差异数据" value="sensitive data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第三类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="数值数据" value="numerical data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第四类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="松弛数据" value="delta data" />
                    </el-radio-group>
                  </div>
                </div>
                <div class="div-content" style="gap: 0;">
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第五类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="集合数据" value="set data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第六类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="键值对数据" value="key_value data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第七类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="位置数据" value="location data" />
                    </el-radio-group>
                  </div>
                  <div style="margin-bottom: 10px; text-align: center;">
                    <div>第八类</div>
                    <el-radio-group v-model="form.selectedDataType">
                      <el-radio-button style="--el-border-radius-base:0px;" label="有序数据" value="order data" />
                    </el-radio-group>
                  </div>

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
                v-show="form.selectedDataType === 'categorical data' && form.isTwoMechanism">
                <el-checkbox-button label="GRR" value="GRR" />
                <el-checkbox-button label="SUE" value="SUE" />
                <el-checkbox-button label="OUE" value="OUE" />
                <el-checkbox-button label="OLH" value="OLH" />
                <el-checkbox-button label="EFM" value="EFM" />
                <el-checkbox-button label="SS" value="SS" />
              </el-checkbox-group>

              <!-- 敏感度差异数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'sensitive data' && !form.isTwoMechanism">
                <el-radio-button label="uRR" value="uRR" />
                <el-radio-button label="uRAP" value="uRAP" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'sensitive data' && form.isTwoMechanism">
                <el-checkbox-button label="uRR" value="uRR" />
                <el-checkbox-button label="uRAP" value="uRAP" />
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
                v-show="form.selectedDataType === 'numerical data' && form.isTwoMechanism">
                <el-checkbox-button label="Duchi" value="Duchi" />
                <el-checkbox-button label="PM" value="PM" />
              </el-checkbox-group>

              <!-- 松弛数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'delta data' && !form.isTwoMechanism">
                <el-radio-button label="OptGM" value="OptGM" />
                <el-radio-button label="NDM" value="NDM" />
                <el-radio-button label="IM" value="IM" />
                <el-radio-button label="NM" value="NM" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'delta data' && form.isTwoMechanism">
                <el-checkbox-button label="OptGM" value="OptGM" />
                <el-checkbox-button label="NDM" value="NDM" />
                <el-checkbox-button label="IM" value="IM" />
                <el-checkbox-button label="NM" value="NM" />
              </el-checkbox-group>

              <!-- 集合数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'set data' && !form.isTwoMechanism">
                <el-radio-button label="Wheel" value="Wheel" />
                <el-radio-button label="PrivSet" value="PrivSet" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'set data' && form.isTwoMechanism">
                <el-checkbox-button label="Wheel" value="Wheel" />
                <el-checkbox-button label="PrivSet" value="PrivSet" />
              </el-checkbox-group>

              <!-- 键值对数据机制选择 -->
              <!-- 单选 -->
              <el-radio-group v-model="form.mechanism"
                v-show="form.selectedDataType === 'key_value data' && !form.isTwoMechanism">
                <el-radio-button label="PCKVGRR" value="PCKVGRR" />
                <el-radio-button label="PCKVUE" value="PCKVUE" />
              </el-radio-group>
              <!-- 多选 -->
              <el-checkbox-group v-model="form.two_mechanisms"
                v-show="form.selectedDataType === 'key_value data' && form.isTwoMechanism">
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
              <el-checkbox-group v-model="form.two_mechanisms"
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
              <el-slider v-model="form.epsilon_range" range :min="0.2" :max="3" :step="0.2" />
            </div>
          </el-card>

          <!-- 输入与执行 -->
          <el-card class="card">
            <!-- 数据集输入 -->
            <span style="font-weight: bold; display: block; text-align: center;">数据集输入</span>
            <div class="div-content" style="justify-content: center;margin-top: 10px;">
              <el-upload :auto-upload="false" :on-exceed="handleExceed" :on-change="handleChange" :on-remove="handleRemove" :limit="1"
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
            <!-- <div class="div-content" style="justify-content: center;margin-top: 10px;"> -->

            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 20px;">
              <div class="div-content"
                style="display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%;">
                <span>原始数据：</span>
                <el-input v-model="form.one_user_input" style="width: 70%" placeholder="请输入单条原始数据" />
              </div>
              <div class="div-content"
                style="display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%;">
                <span>扰动数据：</span>
                <el-input type="textarea" v-model="form.one_user_output" :rows="form.one_user_row" readonly
                  placeholder="扰动数据待显示" style="width: 70%;" />
              </div>
            </div>
            <!-- 两个按钮 -->
            <div class="div-content" style="justify-content: center;margin-top: 20px;gap:0 18px">
              <el-button type="warning" @click="perturb_one_data">扰动数据</el-button>
              <el-button type="warning" @click="aggre_one_data">聚合数据</el-button>
            </div>

          </el-card>

          <!-- 下载源码 -->
          <el-card class="card">
            <div class="div-content" style="justify-content: center;gap:0 30px">
              <div class="div-content" style="justify-content: center;gap:0 30px">
                <!-- 因为项目放到了二级目录中，所以这里也要加一个/privacuTools前缀就行 -->
                <a href="/privacyTools/LDPtool.py" download="LDPtool.py">
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
          <h1>当前接收用户人数为：{{ user_num }} </h1>
          <!-- 类别型数据图像 -->
          <div v-if="form.selectedDataType === 'categorical data'">
            <categorical_chart ref="cat_chart" :chartData="chartData_categorical" />
          </div>
          <!-- 数值型数据图像 -->
          <div v-if="form.selectedDataType === 'numerical data'">
            <numerical_chart ref="num_chart" :chartData="chartData_numerical" />
          </div>
          <!-- 集合型数据图像 -->
          <div v-if="form.selectedDataType === 'set data'">
            <set_chart ref="set_chart" :chartData="chartData_set" />
          </div>
          <!-- 有序型数据图像 -->
          <div v-if="form.selectedDataType === 'order data'">
            <order_chart ref="ord_chart" :chartData="chartData_order" />
          </div>
          <!-- 松弛数据图像 -->
          <div v-if="form.selectedDataType === 'delta data'">
            <delta_chart ref="del_chart" :chartData="chartData_delta" />
          </div>
          <!-- 敏感数据图像 -->
          <div v-if="form.selectedDataType === 'sensitive data'">
            <sensitive_chart ref="sen_chart" :chartData="chartData_sensitive" />
          </div>
          <!-- 键值数据图像 -->
          <div v-if="form.selectedDataType === 'key_value data'">
            <key_value_chart ref="key_chart" :chartData="chartData_key_value" />
          </div>
          <!-- 位置图像 -->
          <div v-if="form.selectedDataType === 'location data'">
            <location_chart ref="loc_chart" :chartData="chartData_location" />
          </div>
        </el-card>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

import axios from 'axios'
import { genFileId } from 'element-plus'

import categorical_chart from './components/categorical_chart.vue';
import numerical_chart from './components/numerical_chart.vue'
import set_chart from './components/set_chart.vue'
import order_chart from './components/order_chart.vue'
import delta_chart from './components/delta_chart.vue'
import sensitive_chart from './components/sensitive_chart.vue'
import key_value_chart from './components/key_value_chart.vue'
import location_chart from './components/location_chart.vue'


export default {
  components: {
    categorical_chart,
    numerical_chart,
    set_chart,
    order_chart,
    delta_chart,
    sensitive_chart,
    key_value_chart,
    location_chart,
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
        // 单条用户的输入值
        one_user_input: '',
        // 单条用户的输出值
        one_user_output: '',
        // 单条用户的输出行数
        one_user_row: 1
      },
      // 用户人数
      user_num: 0,
      // 扰动数据集时，生成的所有扰动数据
      old_perturbed_data: [],
      // 当用户输入单条数据时，扰动的值
      one_data_perturbed_data_list: [],
      // 类别机制图像所用数据
      chartData_categorical: {
        label_frequency: ["A", "B", "C", "D", "E"], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 20, 30, 40, 50, 60] },
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 位置机制图像所用数据
      chartData_location: {
        label_frequency: ["A", "B", "C", "D", "E"], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 20, 30, 40, 50, 60] },
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 敏感机制图像所用数据
      chartData_sensitive: {
        label_frequency: ["A", "B", "C", "D", "E"], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 20, 30, 40, 50, 60] },
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 数值机制所用数据
      chartData_numerical: {
        label_mean: [1, 2, 3, 4, 5], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_mean: [
          { name: '真实均值', data: [10, 10, 10, 10, 10, 10] },
          { name: '机制1', data: [20, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [30, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [40, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 集合机制所用数据
      chartData_set: {
        label_frequency: [1, 2, 3, 4, 5], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 10, 10, 10, 10, 10] },
          { name: '机制1', data: [20, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [30, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [40, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 有序机制图像所用数据
      chartData_order: {
        label_frequency: ["A", "B", "C", "D", "E"], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 20, 30, 40, 50, 60] },
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 敏感机制图像所用数据
      chartData_key_value: {
        label_frequency: ["A", "B", "C", "D", "E"], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_frequency: [
          { name: '真实频率', data: [10, 20, 30, 40, 50, 60] },
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 松弛数据所用图像
      chartData_delta: {
        label_mean: [1, 2, 3, 4, 5], // X轴标签
        label_mse: [1, 2, 3, 4, 5], // MSE 图的标签
        series_mean: [
          { name: '真实均值', data: [10, 10, 10, 10, 10, 10] },
          { name: '机制1', data: [20, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [30, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [40, 16, 26, 36, 46, 56] },
        ],
        series_mse: [
          { name: '机制1', data: [8, 18, 28, 38, 48, 58] },
          { name: '机制2', data: [7, 17, 27, 37, 47, 57] },
          { name: '机制3', data: [6, 16, 26, 36, 46, 56] },
        ],
      },
      // 云服务器ip
      // server_url: 'http://124.223.171.19:8006',
      // 本地ip
      server_url: 'http://localhost:8006',
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
    // 保存原始文件对象
    handleChange(file) {
      this.form.dataset = file.raw
    },
    // 点击删除按钮后删除文件
    handleRemove(){
      this.form.dataset = null
    },
    // 如果上传的文件数量超出限制，自动用新文件代替旧文件
    handleExceed(files) {
      this.$refs.upload.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      this.$refs.upload.handleStart(file)
    },
    // 总函数，扰动数据集
    submitUpload() {
      if (!this.form.isTwoMechanism) {
        // 单个机制
        if (this.form.selectedDataType === 'categorical data') {
          this.categorical_one()
        } else if (this.form.selectedDataType === 'numerical data') {
          this.numerical_one()
        } else if (this.form.selectedDataType === 'set data') {
          this.set_one()
        } else if (this.form.selectedDataType === 'key_value data') {
          this.key_value_one()
        } else if (this.form.selectedDataType === 'location data') {
          this.location_one()
        } else if (this.form.selectedDataType === 'order data') {
          this.order_one()
        } else if (this.form.selectedDataType === 'delta data') {
          this.delta_one()
        } else if (this.form.selectedDataType === 'sensitive data') {
          this.sensitive_one()
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
        } else if (this.form.selectedDataType === 'key_value data') {
          this.key_value_two()
        } else if (this.form.selectedDataType === 'location data') {
          this.location_two()
        } else if (this.form.selectedDataType === 'order data') {
          this.order_two()
        } else if (this.form.selectedDataType === 'delta data') {
          this.delta_two()
        } else if (this.form.selectedDataType === 'sensitive data') {
          this.sensitive_two()
        } else {
          console.log('错误，未匹配任何数据类别')
        }
      }
    },
    // 总函数，扰动单个数据
    perturb_one_data() {
      if (this.form.selectedDataType === 'categorical data') {
        this.categorical_perturb_one_data()
      } else if (this.form.selectedDataType === 'numerical data') {
        this.numerical_perturb_one_data()
      } else if (this.form.selectedDataType === 'set data') {
        this.set_perturb_one_data()
      } else if (this.form.selectedDataType === 'key_value data') {
        this.key_value_perturb_one_data()
      } else if (this.form.selectedDataType === 'location data') {
        this.location_perturb_one_data()
      } else if (this.form.selectedDataType === 'order data') {
        this.order_perturb_one_data()
      } else if (this.form.selectedDataType === 'delta data') {
        this.delta_perturb_one_data()
      } else if (this.form.selectedDataType === 'sensitive data') {
        this.sensitive_perturb_one_data()
      } else {
        console.log('错误，未匹配任何数据类别')
      }
    },
    // 聚合用户的单个数据
    aggre_one_data() {
      if (this.form.selectedDataType === 'categorical data') {
        this.categorical_aggre_one_data()
      } else if (this.form.selectedDataType === 'numerical data') {
        this.numerical_aggre_one_data()
      } else if (this.form.selectedDataType === 'set data') {
        this.set_aggre_one_data()
      } else if (this.form.selectedDataType === 'key_value data') {
        this.key_value_aggre_one_data()
      } else if (this.form.selectedDataType === 'location data') {
        this.location_aggre_one_data()
      } else if (this.form.selectedDataType === 'order data') {
        this.order_aggre_one_data()
      } else if (this.form.selectedDataType === 'delta data') {
        this.delta_aggre_one_data()
      } else if (this.form.selectedDataType === 'sensitive data') {
        this.sensitive_aggre_one_data()
      } else {
        console.log('错误，未匹配任何数据类别')
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------ 
    // 单个类别机制，数据集
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
          // 图像所需数据
          this.chartData_categorical.label_frequency = response.data.domain;
          this.chartData_categorical.label_mse = response.data.epsilon_list;
          this.chartData_categorical.series_frequency = response.data.series_frequency;
          this.chartData_categorical.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.cat_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个类别机制，数据集
    categorical_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/categorical_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_categorical.label_frequency = response.data.domain;
          this.chartData_categorical.label_mse = response.data.epsilon_list;
          this.chartData_categorical.series_frequency = response.data.series_frequency;
          this.chartData_categorical.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.cat_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个类别数据
    categorical_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_categorical.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/categorical_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/categorical_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个类别数据
    categorical_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_categorical.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_categorical.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/categorical_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_categorical.series_frequency = response.data.series_frequency;
            this.chartData_categorical.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.cat_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_categorical.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_categorical.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/categorical_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_categorical.series_frequency = response.data.series_frequency;
            this.chartData_categorical.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.cat_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------
    // 单个敏感机制，数据集
    sensitive_one() {
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
      const post_url = this.server_url + '/sensitive_one'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_sensitive.label_frequency = response.data.domain;
          this.chartData_sensitive.label_mse = response.data.epsilon_list;
          this.chartData_sensitive.series_frequency = response.data.series_frequency;
          this.chartData_sensitive.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.sen_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个敏感机制，数据集
    sensitive_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/sensitive_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_sensitive.label_frequency = response.data.domain;
          this.chartData_sensitive.label_mse = response.data.epsilon_list;
          this.chartData_sensitive.series_frequency = response.data.series_frequency;
          this.chartData_sensitive.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.sen_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个敏感数据
    sensitive_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_sensitive.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/sensitive_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/sensitive_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个敏感数据
    sensitive_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_sensitive.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_sensitive.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/sensitive_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_sensitive.series_frequency = response.data.series_frequency;
            this.chartData_sensitive.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.sen_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_sensitive.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_sensitive.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/sensitive_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_sensitive.series_frequency = response.data.series_frequency;
            this.chartData_sensitive.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.sen_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------






    //------------------------------------------------------------------------------------------------------------------------------------
    // 单个数值机制，数据集
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
      const post_url = this.server_url + '/numerical_one'
      axios.post(post_url, formData)
        .then(response => {
          this.chartData_numerical.label_mean = response.data.epsilon_list;
          this.chartData_numerical.label_mse = response.data.epsilon_list;
          this.chartData_numerical.series_mean = response.data.series_mean;
          this.chartData_numerical.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.num_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个数值机制，数据集
    numerical_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/numerical_two'
      axios.post(post_url, formData)
        .then(response => {
          this.chartData_numerical.label_mean = response.data.epsilon_list;
          this.chartData_numerical.label_mse = response.data.epsilon_list;
          this.chartData_numerical.series_mean = response.data.series_mean;
          this.chartData_numerical.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.num_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个数值数据
    numerical_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/numerical_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/numerical_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个数值数据
    numerical_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const trueMeanData = this.chartData_numerical.series_mean.find(item => item.name === '真实均值').data;
        formData.append('trueMeanData', JSON.stringify(trueMeanData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/numerical_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_numerical.series_mean = response.data.series_mean;
            this.chartData_numerical.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.num_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const trueMeanData = this.chartData_numerical.series_mean.find(item => item.name === '真实均值').data;
        formData.append('trueMeanData', JSON.stringify(trueMeanData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/numerical_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_numerical.series_mean = response.data.series_mean;
            this.chartData_numerical.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.num_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------
    // 单个集合机制,数据集
    set_one() {
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
      const post_url = this.server_url + '/set_one'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_set.label_frequency = response.data.domain;
          this.chartData_set.label_mse = response.data.epsilon_list;
          this.chartData_set.series_frequency = response.data.series_frequency;
          this.chartData_set.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          // 需要的其他数据在这里添加
          this.$nextTick(() => {
            this.$refs.set_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个集合机制，数据集
    set_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/set_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_set.label_frequency = response.data.domain;
          this.chartData_set.label_mse = response.data.epsilon_list;
          this.chartData_set.series_frequency = response.data.series_frequency;
          this.chartData_set.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.set_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个集合数据
    set_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_set.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/set_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/set_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            console.log(491)
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个集合数据
    set_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        formData.append('dataset', this.form.dataset)
        const trueFrequencyData = this.chartData_set.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_set.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/set_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_set.series_frequency = response.data.series_frequency;
            this.chartData_set.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.set_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        formData.append('dataset', this.form.dataset)
        const trueFrequencyData = this.chartData_set.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_set.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/set_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_set.series_frequency = response.data.series_frequency;
            this.chartData_set.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.set_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------
    // 单个键值机制，数据集
    key_value_one() {
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
      const post_url = this.server_url + '/key_value_one'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_key_value.label_frequency = response.data.domain;
          this.chartData_key_value.label_mse = response.data.epsilon_list;
          this.chartData_key_value.series_frequency = response.data.series_frequency;
          this.chartData_key_value.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.key_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    key_value_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/key_value_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_key_value.label_frequency = response.data.domain;
          this.chartData_key_value.label_mse = response.data.epsilon_list;
          this.chartData_key_value.series_frequency = response.data.series_frequency;
          this.chartData_key_value.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.key_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    key_value_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_key_value.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/key_value_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/key_value_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    key_value_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const true_key_p = this.chartData_key_value.series_frequency.find(item => item.name === '真实频率').data;
        const true_value_mean = this.chartData_key_value.series_frequency.find(item => item.name === '真实均值').data;
        formData.append('true_key_p', JSON.stringify(true_key_p))
        formData.append('true_value_mean', JSON.stringify(true_value_mean))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_key_value.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/key_value_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_key_value.series_frequency = response.data.series_frequency;
            this.chartData_key_value.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.key_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const true_key_p = this.chartData_key_value.series_frequency.find(item => item.name === '真实频率').data;
        const true_value_mean = this.chartData_key_value.series_frequency.find(item => item.name === '真实均值').data;
        formData.append('true_key_p', JSON.stringify(true_key_p))
        formData.append('true_value_mean', JSON.stringify(true_value_mean))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_key_value.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/key_value_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_key_value.series_frequency = response.data.series_frequency;
            this.chartData_key_value.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.key_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------
    location_one() {
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
      const post_url = this.server_url + '/location_one'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_location.label_frequency = response.data.domain;
          this.chartData_location.label_mse = response.data.epsilon_list;
          this.chartData_location.series_frequency = response.data.series_frequency;
          this.chartData_location.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.loc_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    location_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/location_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_location.label_frequency = response.data.domain;
          this.chartData_location.label_mse = response.data.epsilon_list;
          this.chartData_location.series_frequency = response.data.series_frequency;
          this.chartData_location.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.loc_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },

    location_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_location.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/location_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/location_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    location_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        // 加入数据集
        formData.append('dataset', this.form.dataset)
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/location_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_location.series_frequency = response.data.series_frequency;
            this.chartData_location.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.loc_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        // 加入数据集
        formData.append('dataset', this.form.dataset)
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/location_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_location.series_frequency = response.data.series_frequency;
            this.chartData_location.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.loc_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 单个有序机制，数据集
    order_one() {
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
      const post_url = this.server_url + '/order_one'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_order.label_frequency = response.data.domain;
          this.chartData_order.label_mse = response.data.epsilon_list;
          this.chartData_order.series_frequency = response.data.series_frequency;
          this.chartData_order.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.ord_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个有序机制，数据集
    order_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/order_two'
      axios.post(post_url, formData)
        .then(response => {
          // 图像所需数据
          this.chartData_order.label_frequency = response.data.domain;
          this.chartData_order.label_mse = response.data.epsilon_list;
          this.chartData_order.series_frequency = response.data.series_frequency;
          this.chartData_order.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.ord_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个有序数据
    order_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      formData.append('domain', JSON.stringify(this.chartData_order.label_frequency))
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/order_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/order_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个有序数据
    order_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_order.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_order.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/order_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_order.series_frequency = response.data.series_frequency;
            this.chartData_order.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.ord_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const trueFrequencyData = this.chartData_order.series_frequency.find(item => item.name === '真实频率').data;
        formData.append('trueFrequencyData', JSON.stringify(trueFrequencyData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('domain', JSON.stringify(this.chartData_order.label_frequency))
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/order_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_order.series_frequency = response.data.series_frequency;
            this.chartData_order.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.ord_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    //------------------------------------------------------------------------------------------------------------------------------------
    // 单个松弛机制，数据集
    delta_one() {
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
      const post_url = this.server_url + '/delta_one'
      axios.post(post_url, formData)
        .then(response => {
          this.chartData_delta.label_mean = response.data.epsilon_list;
          this.chartData_delta.label_mse = response.data.epsilon_list;
          this.chartData_delta.series_mean = response.data.series_mean;
          this.chartData_delta.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.del_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 多个松弛机制，数据集
    delta_two() {
      // 创建新的FormData，准备向后端传输
      const formData = new FormData()
      // 加入数据集
      formData.append('dataset', this.form.dataset)
      // 加入隐私预算区间
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      // 加入选择了哪个机制
      formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
      // 发送请求
      const post_url = this.server_url + '/delta_two'
      axios.post(post_url, formData)
        .then(response => {
          this.chartData_delta.label_mean = response.data.epsilon_list;
          this.chartData_delta.label_mse = response.data.epsilon_list;
          this.chartData_delta.series_mean = response.data.series_mean;
          this.chartData_delta.series_mse = response.data.series_mse;
          this.user_num = response.data.user_num
          this.old_perturbed_data = response.data.old_perturbed_data;
          this.$nextTick(() => {
            this.$refs.del_chart.updateChart();
          });
        })
        .catch(errpr => {
          console.error('axios上传失败');
          alert("输入不合法，请检查后输入")
        });
    },
    // 扰动用户的一个松弛数据
    delta_perturb_one_data() {
      const formData = new FormData()
      formData.append('data', this.form.one_user_input)
      formData.append('epsilon_low', this.form.epsilon_range[0])
      formData.append('epsilon_high', this.form.epsilon_range[1])
      if (!this.form.isTwoMechanism) {
        //单个机制
        formData.append('mechanism', this.form.mechanism)
        //发送请求
        const post_url = this.server_url + '/delta_perturb_one_data_one'

        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = `${this.form.mechanism}\n`;
            output += epsilon_list.map((epsilon, index) => {
              const perturbedData = perturbed_data_list[index];
              return `当隐私预算为${epsilon}时, 扰动数据为${perturbedData}`;
            }).join('\n'); // 将数组拼接成多行字符串
            this.form.one_user_output = output
            // 动态调整行数
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      } else {
        //多个机制
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        //发送请求
        const post_url = this.server_url + '/delta_perturb_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            const { epsilon_list, perturbed_data_list } = response.data;
            this.one_data_perturbed_data_list = perturbed_data_list
            let output = ``;
            this.form.two_mechanisms.forEach((mechanism, mechanismIndex) => {
              // 添加机制名称
              output += `${mechanism}:\n`;
              // 添加每个机制的扰动数据
              epsilon_list.forEach((epsilon, epsilonIndex) => {
                output += `当隐私预算为${epsilon}时, 扰动数据为${perturbed_data_list[mechanismIndex][epsilonIndex]}\n`;
              });
              output += '\n'; // 机制之间的空行
            });
            this.form.one_user_output = output
            this.form.one_user_row = Math.max(output.split('\n').length, 1);
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
    },
    // 聚合用户的一个松弛数据
    delta_aggre_one_data() {
      // 单个机制
      if (!this.form.isTwoMechanism) {
        const formData = new FormData()
        const trueMeanData = this.chartData_delta.series_mean.find(item => item.name === '真实均值').data;
        formData.append('trueMeanData', JSON.stringify(trueMeanData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('mechanism', this.form.mechanism)
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/delta_aggre_one_data_one'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_delta.series_mean = response.data.series_mean;
            this.chartData_delta.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.del_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
      // 多个机制
      else {
        const formData = new FormData()
        const trueMeanData = this.chartData_delta.series_mean.find(item => item.name === '真实均值').data;
        formData.append('trueMeanData', JSON.stringify(trueMeanData))
        formData.append('new_perturbed_data_list', JSON.stringify(this.one_data_perturbed_data_list))
        formData.append('old_perturbed_data_list', JSON.stringify(this.old_perturbed_data))
        formData.append('epsilon_low', this.form.epsilon_range[0])
        formData.append('epsilon_high', this.form.epsilon_range[1])
        formData.append('user_num', this.user_num)
        formData.append('multi_mechanisms', JSON.stringify(this.form.two_mechanisms))
        formData.append('onedata', this.form.one_user_input)


        const post_url = this.server_url + '/delta_aggre_one_data_two'
        axios.post(post_url, formData)
          .then(response => {
            // 图像所需数据
            this.chartData_delta.series_mean = response.data.series_mean;
            this.chartData_delta.series_mse = response.data.series_mse;
            this.user_num = response.data.user_num
            this.old_perturbed_data = response.data.old_perturbed_data;
            this.$nextTick(() => {
              this.$refs.del_chart.updateChart();
            });
          })
          .catch(errpr => {
            console.error('axios上传失败');
            alert("输入不合法，请检查后输入")
          });
      }
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
  align-items: center;
  gap: 0 36px;
  flex-wrap: wrap;

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
