<template>
  <!-- 版心 -->
  <div class="centre">
    <!-- 左侧tab布局 -->
    <el-row>
      <el-col :span="8">
        <ZztTabForm />
      </el-col>
      <!-- 右侧布局 -->
      <el-col :span="16">
        <ZztContentForm />
        <!-- 分页结构 -->
        <el-pagination
          v-show="form"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ZztTabForm from "@/components/post/zztTabForm.vue";
import ZztContentForm from "@/components/post/zztContentForm.vue";

export default {
  data() {
    return {
        form:[],
        pageIndex:1,
        pageSize:5,
        total:0

    };
  },
  components: {
    ZztTabForm,
    ZztContentForm
  },
  methods:{
      handleSizeChange(){},
      handleCurrentChange(){}

  }
  
};
</script>

<style scoped lang="less">
.centre {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom:20px;

}
</style>
