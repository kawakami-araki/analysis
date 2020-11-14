<template>
    
    <el-table :data="base_file_data" border style="width: 100%">
        <el-table-column prop="file_name" label="磁盘名称" width="120">
        </el-table-column>
        <el-table-column prop="table_name" label="磁盘数据库" width="120">
        </el-table-column>
        <el-table-column prop="file_path" label="磁盘路径"> </el-table-column>
        <el-table-column prop="file_path" label="磁盘使用情况统计图">
            <div class="main" style="float:left;width:100%;height: 500px"></div>
        </el-table-column>
    </el-table>
</template>

<script>

import echarts from 'echarts'

import {file_from_base_get,base_file_data_from_get } from './axios_api/api.js'
export default {
    name: 'Base',
    data() {
        return {
            base_file_data: [],
            // base_data_size: [],
            // base_data_sum: []
        }
    },
    mounted() {
        this.get_base_data();
        // this.get_echarts_data();
        this.get_base_data_list();
    },
    methods: {
        // 基础信息获取
        get_base_data() {
            file_from_base_get().then(res => {
                console.log(res)
                this.base_file_data = res.data;
            });
        },
        get_base_data_list() {
            base_file_data_from_get().then(res => {
                this.create_pie_plot(res.data, res.type_list);
            });
            
        },
        create_pie_plot(data, type_list) {
            
            // 捕捉div， 添加数据
            var myChart_1 = echarts.init(document.getElementsByClassName('main')[1]);
            var myChart_2 = echarts.init(document.getElementsByClassName('main')[2]);
            var myChart_3 = echarts.init(document.getElementsByClassName('main')[3]);
            var myChart_4 = echarts.init(document.getElementsByClassName('main')[4]);
            var myChart_5 = echarts.init(document.getElementsByClassName('main')[5]);
            var myChart_list = [myChart_1, myChart_2,myChart_3, myChart_4, myChart_5]
            console.log(myChart_list);
            for(var i=0;i<myChart_list.length;i++){
                var pie_value = data[i];
                if(pie_value.length == 0){
                    pie_value = [{'value':1, 'name':'None'}]
                    console.log(1)
                }
                
                console.log(pie_value)
                myChart_list[i].setOption({
                    title : {
                        text: '',//主标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: type_list
                    },
                    series : [
                        {
                            name: '',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:pie_value,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                            }
                        }
                    ]
                });
            }
            
        }
    }

}
</script>

<style lang='stylus'>

</style>