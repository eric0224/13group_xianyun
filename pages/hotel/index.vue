<template>
  <div class="xsl-main">
    <!--  面包屑 -->
    <div class="xsl-hotel">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单 -->
    <div>
      <hotelForm :data="hotelCity"></hotelForm>
    </div>
  </div>
</template>

<script>
import hotelForm from "../../components/hotel/hotelform";
export default {
  data() {
    return {
      // data的数据
      hotelCity:{},
      // 总数据
      hotelData:{},
      // 表单数据
      city: ""
    };
  },
  mounted(){
    this.$axios({
      url:'/hotels'
    }).then(res =>{
      console.log(res)
      // 总数据
      this.hotelData = res
      // data里面的数据
      this.hotelCity = res.data.data
    })
  },
  components: {
    hotelForm
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