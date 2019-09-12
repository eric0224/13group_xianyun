<template>
  <div class="post">
    <!-- 文章题目 -->
    <div class="post-title">{{this.detailData.title}}</div>
    <!-- 状态条 -->
    <div class="status-bar">
      攻略 :
      <span>{{this.detailData.created_at | timeFormat}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      阅读 :
      <span>{{this.detailData.watch}}</span>
    </div>
    <!-- 文章内容 -->
    <div class="post-content" v-html="this.detailData.content"></div>
  </div>
</template>
 

<script>
import Moment from 'moment'
export default {
  data() {
    return {
      detailData: {} // 存储文章详情总数据
    };
  },
  filters:{
    timeFormat(time){
      const date = new Date(time)
    
      return Moment(date).format('YYYY-MM-DD HH:mm')
    }
  },
  mounted() {
    // console.log(this.$route.query)
    const { id } = this.$route.query;
    this.$axios({
      url: "/posts",
      params: { id }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      // 赋值给总数据
      this.detailData = data[0];
      //将数据存到store
      this.$store.commit('postDetail/setPostDetail',data[0])
    });
  }
};
</script>

<style lang="less" scoped>
.post {
  margin-bottom: 20px;
  .post-title {
    width: 100%;
    padding: 20px 0;
    font-size: 32px;
    font-weight: 900;
    border-bottom: 1px solid #ddd;
  }

  .status-bar {
    padding: 20px 20px;
    text-align: right;
    font-size: 16px;
    color: #999999;
  }

  .post-content {
    font-size: 16px;

    /deep/ p {
      margin-bottom: 5px;

    /deep/ img {
        max-width: 700px;
        margin: 10px 0;
      }

      // /deep/ a,
      // span {
      //   /deep/img {
      //     width: 100%;
      //     margin: 10px 0;
      //   }
      // }
    }
  }
}
</style>