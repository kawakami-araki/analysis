<template>
    <div>
        <el-row :gutter="20">
            <!-- 不输入名字默认为全部 -->
            <!-- 文件名搜索框 -->
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <el-input
                        placeholder="请输入要搜索的文件名"
                        v-model="search_name"
                        suffix-icon='el-icon-search'
                        clearable>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认全选 -->
            <!-- 按类型查询 1.类型选择多选框 -->
            <el-col :span="12">
                <div class="grid-content bg-purple" style="overflow:auto;line-height:10px">
                    <el-checkbox :indeterminate="isIndeterminate_type" v-model="checkAll_type" @change="handleCheckAllChange_type">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
                        <el-checkbox v-for="type_data in file_type_list" :label="type_data.id" :key="type_data.id" :checked='checked_type'>{{type_data.file_type}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            <!-- 按类型查询 2.输入类型进行补充 -->
            <el-col :span="12">
                <div class="grid-content bg-purple">

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认为全选 -->
            <!-- 按路径查询 1.路径选择多选框 -->
            <el-col :span="12">
                <div class="grid-content bg-purple" style="overflow:auto;line-height:50px">
                    <el-checkbox :indeterminate="isIndeterminate_path" v-model="checkAll_path" @change="handleCheckAllChange_path">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedPaths" @change="handleCheckedPathsChange">
                        <el-checkbox v-for="file_path in file_path_list" :label="file_path.table_name" :key="file_path.table_name" :checked='checked_path'>{{file_path.file_path}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            <!-- 按路径查询 2.输入路径进行补充(输入路径之后, 选择的路径将会失效) -->
            <el-col :span="12">
                <div class="grid-content bg-purple">

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 此条不选默认为全选 -->
            <!-- 按大小进行查询 1.文件大小范围选择框 -->
            <el-col :span="12">
                <div class="grid-content bg-purple">

                </div>
            </el-col>
            <!-- 按大小进行查询 2.通过手动输入来进行限定范围, 只有一个值则另一个值记为最大或最小 -->
            <el-col :span="12">
                <div class="grid-content bg-purple">

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!-- 提交按钮, 触发事件进行请求 -->
            <el-col :span="24">
                <div class="grid-content bg-purple">

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {file_type_list_get,file_from_base_get} from './axios_api/api.js'
export default {
    name: 'Search',
    data() {
        return {
            search_name: '',
            // 文件类型多选框信息
            file_type_list: [],
            checkAll_type: false,
            checkedTypes: [],
            types: [],
            isIndeterminate_type: true,
            checked_type: false,
            // 文件路径多选框信息
            file_path_list: [],
            checkAll_path: false,
            checkedPaths: [],
            Paths: [],
            isIndeterminate_path: true,
            checked_path: false,

        }
    },
    mounted() {
        this.get_file_type_list();
        this.get_base_path();


    },
    methods: {
        handleCheckAllChange_type(val) {
            this.checked_type = val;
            this.checkedTypes = val ? this.file_type_list : [];
            this.isIndeterminate_type = false;
        },
        handleCheckedTypesChange(value) {
            let checkedCount = value.length;
            this.checkAll_type = checkedCount === this.types.length;
            this.isIndeterminate_type = checkedCount > 0 && checkedCount < this.types.length;
        },
        handleCheckAllChange_path(val) {
            this.checked_path = val;
            this.checkedPaths = val ? this.file_path_list : [];
            this.isIndeterminate_path = false;
        },
        handleCheckedPathsChange(value) {
            let checkedCount = value.length;
            this.checkAll_path = checkedCount === this.Paths.length;
            this.isIndeterminate_path = checkedCount > 0 && checkedCount < this.Paths.length;
        },
        // 获取文件类型列表
        get_file_type_list() {
            file_type_list_get().then(res => {
                this.file_type_list = this.types = res.data;
            })
        },
        // 获取文件基础盘列表
        get_base_path() {
            file_from_base_get().then(res =>{
                this.file_path_list = this.Paths = res.data;
            })
        },

    }
}
</script>

<style lang='stylus'>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height 200px
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>