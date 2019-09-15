<template>
  <div class="post">
    <!-- 文章题目 -->
    <div class="post-title">{{this.detailData.title}}</div>
    <!-- 状态条 -->
    <div class="status-bar">
      攻略 :
      <span>{{this.detailData.created_at | timeFormat}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      阅读 :
      <span>{{postWatch}}</span>
    </div>
    <!-- 文章内容 -->
    <div class="post-content" v-html="this.detailData.content"></div>

    <!-- 功能条区 -->
    <div class="function-bar">
        <el-row type="flex" justify="center">
            <div class="comment">
                <span class="iconfont iconpinglun"></span>
                评论<i v-if="commentAcount != 0">({{commentAcount}})</i>
            </div>
            <div class="star" @click="handleStar">
                <span class="iconfont iconstar1" style="font-size:36px"  ></span>
                <i>收藏</i>
            </div>
            <div class="share">
                <span class="iconfont iconfenxiang"></span>
                <i>分享</i>
            </div>
            <div class="like" @click="handleLike">
                <span class="iconfont iconding"></span>
                点赞<i v-if="detailData.like">({{detailData.like}})</i>
            </div>
        </el-row>
    </div>
  </div>
</template>
 

<script>

import {timeFormat} from '@/plugins/timeFormat'
export default {
  data() {
    return {
      detailData: {}, // 存储文章详情总数据
      commentAcount:0,//评论数组的长度
      postWatch:0 // 阅读数
    };
  },
  filters:{
    timeFormat
  },
  methods:{
    // 获取数据
    getData(){
      const { id } = this.$route.query;
      this.$axios({
      url: "/posts",
      params: { id }
    }).then(res => {
   
      const { data } = res.data;
      // 赋值给总数据
      this.detailData = data[0];
      this.commentAcount = data[0].comments.length
      this.postWatch =  data[0].watch
      
      //将数据存到store
      // this.$store.commit('postDetail/setPostDetail',data[0])
    });
    },

     //收藏文章
        handleStar(){
            this.$axios({
                url:'/posts/star',
                params:{id:this.detailData.id},
                headers: {Authorization:` Bearer ${this.$store.state.user.userInfo.token}`}
            }).then((res)=>{
               
                this.$message.success(res.data.message)
            })
        },

       //点赞功能
        handleLike(){
            this.$axios({
                url:'/posts/like',
                params:{id:this.detailData.id},
                headers:{Authorization:` Bearer ${this.$store.state.user.userInfo.token}`}
            }).then((res)=>{
               
                this.$message.success(res.data.message)
                this.getData()
            })
        }  

  },
  watch:{
    $route(){
      this.getData()
    }
  },
  mounted() {
    // console.log(this.$route.query)
    this.getData()

    
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

  .function-bar{
    width: 100%;
    padding: 15px 10px;
    margin: 20px 0;

        .comment,.star,.share,.like{
           width: 60px;
           height: 60px;      
           font-size: 14px;
           color:#bbb;
           text-align: center; 
           margin:0 5px;
           padding-bottom: 10px;
           cursor: pointer;
                        
           span{
               width: 33px;
               height: 33px;
               margin: 0 auto;
               font-size: 28px;
               display: block;
               color:#ffa500;
               margin-bottom: 5px;          
            }
        }
}
}
</style>