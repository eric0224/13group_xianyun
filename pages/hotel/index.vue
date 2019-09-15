<template>
  <div class="xsl-main">
    <!--  面包屑 -->
    <div class="xsl-hotel">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{$store.state.hotel.name}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单 -->
    <div>
      <hotelForm></hotelForm>
    </div>
    <!-- 筛选部分 -->
    <creenForm></creenForm>
  </div>
</template>

<script>
import creenForm from '../../components/hotel/screenform'
import hotelForm from "../../components/hotel/hotelform";
export default {
  data() {
    return {
      
      // 表单数据
      city: ""
    };
  },
  mounted(){

  },
  components: {
    hotelForm,
    creenForm
  }
};
</script>

<style scoped lang="less">
.xsl-main {
  width: 1000px;
  margin: 0 auto;

  .xsl-hotel {
    padding: 20px 0;
  }
}
</style>