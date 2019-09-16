<template>
  <div class="commentBoard">
    <!-- 头部信息 -->
    <el-row class="comment-top" type="flex" justify="space-between">
      <div class="userInfo">
        <img :src="`${$axios.defaults.baseURL}${data.account.defaultAvatar}`" alt />
        <span>{{data.account.nickname}}</span>
        <i>{{data.created_at | timeFormat}}</i>
      </div>
      <span>{{data.level}}</span>
    </el-row>
    <!-- 评论内容 -->
    <div class="comment-content" >
      <div class="parent-content" v-if="data.parent">
        <!-- 跟帖父级内容 -->
        <!-- <item :data="data.parent" v-if="data.parent" /> -->
        <ResponeComment :data="data.parent" @getComment="getComment" />
      </div>

      <div @mouseenter="isShow=true" @mouseleave="isShow= false" style="margin-top:5px">
        <!-- 文本内容 -->
        <div class="comment-text">{{data.content}}</div>
        <!-- 图片展示区 -->
        <el-row class="show-pic" type="flex" justify="start">
          <div class="picture" v-for="(item,index) in data.pics" :key="index">
            <img :src="`${$axios.defaults.baseURL}${item.url}`" @click="picVisible(item.url)" />
          </div>
        </el-row>
        <!-- 回复 -->
        <div class="respone">
          <a @click="handleRespone(data.id)" href="#maodian" v-show="isShow">回复</a>
        </div>
      </div>
    </div>
    <!-- diaolog图片展示 -->
    <el-dialog :visible.sync="dialogVisible" style="padding:10px 5px" width="50%">
      <img :src="`${$axios.defaults.baseURL}${this.bigPic}`" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import { timeFormat } from "@/plugins/timeFormat";
import ResponeComment from "@/components/post/responeComment";
export default {
  name: "item",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShow: false,
      userInfo: {
        nickname: "",
        id: 0
      },
      dialogVisible: false,
      bigPic: ""
    };
  },
  components: {
    ResponeComment
  },
  filters: {
    timeFormat
  },
  methods: {
    //显示dialog框
    picVisible(url) {
      this.dialogVisible = true;
      this.bigPic = url;
    },

    //这个事件用于给子组件传递数据
    getComment(obj) {
      this.userInfo = obj
      // 给父组件传递回复的id、
      this.$emit("getResponeID", this.userInfo);
    },

    // 回复评论
    handleRespone(id) {
      this.userInfo.nickname = this.data.account.nickname;
      this.userInfo.id = id;
      // 给父组件传递回复的id、
      this.$emit("getResponeID", this.userInfo);
      //将对应的用户名存到store
      // this.$store.commit('postDetail/setFollowId',this.userInfo.nickname)
    }
  }
};
</script>

<style lang="less" scoped>
.commentBoard {
  width: 100%;
  border-bottom: 1px dashed #ddd;
  padding: 20px 20px 10px;
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }

  .comment-top {
    font-size: 12px;
    margin-bottom: 10px;
    .userInfo {
      img {
        vertical-align: middle;
        width: 15px;
        // height: 14px;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }

    i {
      font-size: 10px;
      color: #999;
    }
  }

  .comment-content {
    padding-left: 10px;

    .parent-content {
      border: 1px solid #ddd;
      background-color: #f9f9f9;
    }
    // .comment-text {
    //   margin-bottom: 10px;
    // }

    .picture {
      width: 90px;
      height: 90px;
      line-height: 90px;
      border: 1px dashed #ddd;
      padding: 5px;
      border-radius: 8%;
      text-align: center;
      box-sizing: border-box;
      margin: 10px 5px 0 0;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
 
  .respone {
    height: 16px;
    font-size: 12px;
    color: #1e50a2;
    text-align: right;
    // display: none;
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>