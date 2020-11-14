<template>
    <el-container>
        <el-header>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#B3C0D1"
                text-color="#fff"
                active-text-color="#ffd04b"
                router=true
                style="margin-left:600px"
                >
                <el-menu-item index="/base">首页</el-menu-item>
                <el-menu-item index="/search">搜索</el-menu-item>
                <el-menu-item index="/label">创建新标签</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Index',
    components: {
        // 组件注册
    },
    data (){
        return {
            activeIndex: '1',
        }
    },
    methods: {
        handleSelect(key, keyPath) {
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
        height 200px;
    }
    .el-container {
        height 95vh;
    }
    .el-main {
        background-color: rgb(255,255,255);
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>