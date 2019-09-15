<template>
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
                点赞<i v-if="data.like">({{data.like}})</i>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{},
            commentAcount:0,
        }

    },
    methods:{
        //获取数据
        init(){
           //从本地获取文章详情总数据
          setTimeout(()=>{
          this.data = this.$store.state.postDetail.postDetail
          // console.log(this.data)
          this.commentAcount = this.data.comments.length
          },10)  
        },

        //收藏文章
        handleStar(){
            this.$axios({
                url:'/posts/star',
                params:{id:this.data.id},
                headers: {Authorization:` Bearer ${this.$store.state.user.userInfo.token}`}
            }).then((res)=>{
                console.log(res)
                this.$message.success(res.data.message)
            })
        },

        //点赞功能
        handleLike(){
            this.$axios({
                url:'/posts/like',
                params:{id:this.data.id},
                headers:{Authorization:` Bearer ${this.$store.state.user.userInfo.token}`}
            }).then((res)=>{
               
                this.$message.success(res.data.message)
                this.init()
            })
        }
    },
    mounted(){
       this.init()
    }
}
</script>

<style lang="less" scoped>
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
</style>