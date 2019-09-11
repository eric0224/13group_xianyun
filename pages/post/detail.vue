<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 主体部分 -->
      <div class="main">
          <!-- 面包屑 -->
          <div class="breadcrumb">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{path:'/post'}">旅游攻略</el-breadcrumb-item>
                  <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          
        <!-- 文章部分 -->
        <PostContent/>

        <!-- 功能区 -->
        <FunctionBar/>

        <!-- 评论区 -->
        <Comment/>
        <!-- 分页功能 -->

      </div>

      <!-- 侧边栏 -->
      <DetailAside/>


    </el-row>
  </div>
</template>

<script>
import PostContent from '@/components/post/postContent';
import DetailAside from '@/components/post/detailAside';
import FunctionBar from '@/components/post/functionBar';
import Comment from '@/components/post/comment'
export default {
    components:{
        PostContent,DetailAside,FunctionBar,Comment
    }
};
</script>

<style lang="less" scoped>
.container{
    width: 1000px;
    margin: 20px auto;

    .main{
        
        width: 700px;
        

       .breadcrumb{         
         font-size: 14px;
         margin-bottom: 5px;
       }

    }


    
}
</style>