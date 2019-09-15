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
        <PostContent />

        <!-- 功能区 -->
        <!-- <FunctionBar/> -->

        <!-- 发表评论区 -->
        <Comment @updateComments="updateComments" :userInfo="userInfo"/>

        <div class="comments">
          <!-- 评论展示区 -->
          <CommentBoard v-for="(item,index) in commentsData" :key="index" :data="item"  @getResponeID="getResponeID"/>
        </div>

        <!-- 分页功能 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <DetailAside />
    </el-row>
  </div>
</template>

<script>
import PostContent from "@/components/post/postContent";
import DetailAside from "@/components/post/detailAside";
// import FunctionBar from '@/components/post/functionBar';
import Comment from "@/components/post/comment";
import CommentBoard from "@/components/post/commentBoard";
export default {
  data() {
    return {
      //存储评论总数据
      commentsData: [],
      currentPage: 0, //当前页
      pageSize:54, //每页条数
      userInfo:{} // 回复评论的id
    };
  },
  components: {
    PostContent,
    DetailAside,
    Comment,
    CommentBoard
  },
  methods: {
    //获取数据
    getData() {
      setTimeout(() => {
        const { id } = this.$route.query;
        this.$axios({
          url: "/posts/comments",
          params: { post: id, _limit: this.pageSize, _start: this.currentPage }
        }).then(res => {
          console.log(res)
          // 赋值给总数据
          this.commentsData = res.data.data;
        });
      }, 10);
    },

    //发表评论后更新评论
    updateComments(){
      this.getData()
    },

    //发送评论板子组件的方法
    getResponeID(obj){
      this.userInfo = obj
      // console.log(this.followId)
    },
    //每页条数变化触发的事件
    handleSizeChange() {},

    //当前页变化触发的事件
    handleCurrentChange() {}
  },
  mounted() {
    this.getData()
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;

  .main {
    width: 700px;

    .breadcrumb {
      font-size: 14px;
      margin-bottom: 5px;
    }

    .comments {
      width: 100%;
      border: 1px solid #ddd;
      margin-bottom: 10px;
    }
  }
}
</style>