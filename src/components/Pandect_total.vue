<template>
  <div class="pandect_total">
    <el-container style="height:85vh">
      <el-header style="background:#ffffff">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div>
              <el-date-picker v-model="file_create_data" type="date" placeholder="选择日期">
              </el-date-picker></div
          ></el-col>
          <el-col :span="6"
            ><div>
              <el-select v-model="file_type" placeholder="请选择要查看的文件类型">
                <el-option
                  v-for="item in file_type_list"
                  :key="item.value"
                  :label="item.type_name"
                  :value="item.value"
                >
                </el-option>
              </el-select></div
          ></el-col>
          <el-col :span="6"
            ><div>
              <el-select v-model="file_size" placeholder="请选择要查看的文件大小">
                <el-option
                  v-for="item in file_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              </div
          ></el-col>
          <el-col :span="6"><div><el-input
                placeholder="请输入要搜索的文件名"
                prefix-icon="el-icon-search"
                v-model="search_name"
              >
              </el-input></div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="files_data" border style="width: 100%">
          <el-table-column prop="create_time" label="日期" width="120"> </el-table-column>
          <el-table-column prop="file_name" label="文件名" width="120">
          </el-table-column>
          <el-table-column prop="file_type" label="文件类型" width="120">
          </el-table-column>
          <el-table-column prop="file_size" label="文件大小" width="120">
          </el-table-column>
          <el-table-column prop="file_path" label="文件路径"> </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, files_data)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>  
        </el-table>
      </el-main>
    </el-container>
    
    
  </div>
</template>

<script>
import { file_data_get,file_type_list_get,file_from_type_get,file_from_size_get,file_from_create_data_get,file_from_search_name_get } from './axios_api/api.js'
export default {
  name: "Pandect_total",
  watch: {
    //监听数据变化来进行请求
    // 监听文件类型选择框的状态，发生改变时触发请求
    file_type: 'watch_file_type',
    // 监听文件大小选择框的状态，发生改变时触发请求
    file_size: 'watch_file_size',
    // 监听时间选择框的状态，发生改变时触发请求
    file_create_data: 'watch_file_create_data',
    // 监听搜索框状态， 发生改变时触发请求
    search_name: 'watch_search_name',
    

  },
  data() {
    return {
      // 选择框--选择文件类型进行展示， 当前使用固定数据， 后期改为后端接口数据
      file_type_list: [
        {
          value: "json",
          type_name: "json",
        },
        {
          value: "txt",
          type_name: "txt",
        },
        {
          value: "md",
          type_name: "md",
        },
        {
          value: "bat",
          type_name: "bat",
        },
        {
          value: "sh",
          type_name: "sh",
        },
      ],
      // 用于接收选中的文件类型
      file_type: '',
      // 划定文件大小的范围----使用固定数据来划分文件大小的范围
      file_size_list: [

      ],
      file_size: '',
      // 按照文件日期进行筛选
      file_create_data: "",
      // 按照文件名进行搜索时接受输入的文件名
      search_name: "",
      // 文件信息的数据， 后期修改为请求后端接口来获取对应的数据
      // files_data: [],
      files_data: [
        {
          create_time: "2016-05-02",
          file_name: "王小虎",
          file_type: "file",
          file_size: "1000kb",
          file_path: "上海市普陀区金沙江路 1518 弄",
        }
        
      ],
    };
  },
  mounted() {
    this.get_files_data()
  },
  methods: {
    // 移除按钮功能选项， 内容暂定， 该移除功能并不影响后台， 后续需要添加后台接口来确保移除按钮的实现
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log('true')
    },
    // 请求后台所有的文件的数据， 对应的变量为files_data
    get_files_data(){
      file_data_get().then(resp => {
        console.log(resp);
        if(resp)this.files_data=resp;
      })
    },
    // 请求后台所有的文件类型， 对应的变量为file_type_list
    get_files_type_list() {
      file_type_list_get().then(resp =>{
        console.log(resp);
        if(resp)this.file_type_list=resp;
      })
    },
    // 监听file_type并进行操作
    watch_file_type(curVal,oldVal) {
      console.log(curVal,oldVal)
      file_from_type_get({'file_type': curVal}).then(resp =>{
        console.log(resp);
        if(resp)this.files_data=resp;
      })

    },
    // 监听file_szie并进行操作
    watch_file_size(curVal,oldVal) {
      console.log(curVal,oldVal)
      file_from_size_get({'file_size': curVal}).then(resp =>{
        console.log(resp);
        if(resp)this.files_data=resp;
      })

    },
    // 监听file_create_data并进行操作
    watch_file_create_data(curVal,oldVal) {
      console.log(curVal,oldVal)
      file_from_create_data_get({'file_create_time': curVal}).then(resp =>{
        console.log(resp);
        if(resp)this.files_data=resp;
      })
    },
    // 监听search_name并进行操作
    watch_search_name(curVal,oldVal) {
      console.log(curVal,oldVal)
      file_from_search_name_get({'search_name': curVal}).then(resp =>{
        console.log(resp);
        if(resp)this.files_data=resp;
      })

    },
  },
  components: {},
};
</script>

<style lang="stylus">
.pandect_total {
  background: #ffdfff;
  margin: 10px;
}
</style>