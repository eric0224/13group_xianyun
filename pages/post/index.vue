<template>
  <div class="travel">
        <el-row type="flex" justify="space-between">
            <div class="menu_left">
                <!-- 左边菜单组件 -->
                <leftMenu/>
            </div>
            <div class="menu_right">
                <!-- 右边旅游详情列表 -->
                <!-- 右边搜索栏 -->
                <rightSearch/>
            </div>
            
        </el-row>
  </div>
</template>

<script>
import leftMenu from '@/components/post/leftMenu.vue'
import rightSearch from '@/components/post/rightSearch.vue'
export default {
    components:{
        leftMenu,
        rightSearch
    }
}
</script>

<style lang="less" scoped>
.travel{
    width: 1000px;
    margin: 0 auto;
}
.menu_left{
    width: 260px;
    margin-top: 20px;
    // height: 500px;
    // background-color: red;
}

.menu_right{
    width: 700px;
    margin-top: 20px;
    // height: 500px;
    // background-color: green;
    margin-bottom:30px 
}
</style>