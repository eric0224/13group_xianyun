<template>
  <!-- 版心 -->
  <div class="centre">
    <!-- 左侧tab布局 -->
    <el-row>
      <el-col :span="8">
        <ZztTabForm />
      </el-col>
      <!-- 右侧列表布局 -->
      <el-col :span="16">
        <ZztContentForm />
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


    };
  },
  components: {
    ZztTabForm,
    ZztContentForm
  },

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
