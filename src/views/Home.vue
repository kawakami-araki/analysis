<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple" style="background:#B3C0D1;height:50px">
              <img src="../../public/timg.png" alt="logo示例" width="50px" height="50px">
            </div>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple-light" style="margin-right:0;"></div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-col :span="12">
              <el-menu default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose" 
                background-color="#D3DCE6" 
                text-color="#fff" 
                active-text-color="#409eff" 
                :unique-opened='true' :collapse-transition="false" :router="true"
                >
                    <!-- 一级菜单 -->
                    <el-submenu :index="'/'+ item.path" v-for="(item,index) in menulist" :key="index">
                        <!-- 一级菜单模版区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + item2.path" v-for="(item2,index) in item.children" :key="index" @click="saveNavState('/' + item2.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ item2.name }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
// 首页文件
export default {
  name: 'Home',
  components: {
    // 组件注册
  },
  data (){
    return {
      iconsObj: {
          '1': 'el-icon-pie-chart',
          '2': 'el-icon-tickets',
          '3': 'el-icon-s-promotion',
          '4': 'el-icon-postcard',
          '5': 'el-icon-user-solid',
          '6': 'el-icon-s-marketing',
          // '7': 'el-icon-message-solid',
      },
      menulist: [
        {
            'id': 1,
            'name': '总览',
            'path': '/pandect_total',
            'children': [
                {'id': 7, 'name': '总览', 'path': 'pandect_total'},
                {'id': 8, 'name': '功能模块2', 'path': ''},
                {'id': 9, 'name': '功能模块3', 'path': ''},
                {'id': 10, 'name': '功能模块4', 'path': ''},
                {'id': 11, 'name': '功能模块5', 'path': ''},
            ]
        },
        {
            'id': 2,
            'name': '分类二',
            'path': '2',
            'children': [
                {'id': 12, 'name': '功能模块1', 'path': ''},
                {'id': 13, 'name': '功能模块2', 'path': ''},
                {'id': 14, 'name': '功能模块3', 'path': ''},
                {'id': 15, 'name': '功能模块4', 'path': ''},
                {'id': 16, 'name': '功能模块5', 'path': ''},
            ]
        },
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="stylus">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-container {
    height 95vh;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: rgb(255,255,255);
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    background-color: #D3DCE6;

  }
  
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 50px;
    margin-top 5px;
    margin-right 15px;
  }
</style>
