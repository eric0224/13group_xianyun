<template>
  <div class="responeCom" >
    <item :data="data.parent" v-if="data.parent" />
    <div @mouseenter="isShow=true" @mouseleave="isShow= false" style="padding:10px">
      <!-- 头部信息 -->
      <el-row class="comment-top" type="flex" justify="space-between" style="margin-top:5px">
        <div class="userInfo">
          <!-- <img :src="`${$axios.defaults.baseURL}${data.account.defaultAvatar}`" alt /> -->
          <span>{{data.account.nickname}}</span>
          <i>{{data.created_at | timeFormat}}</i>
        </div>
        <span>{{data.level}}</span>
      </el-row>

      <!-- 文本内容 -->
      <div class="comment-text">{{data.content}}</div>
      <!-- 图片展示区 -->
      <el-row class="show-pic" type="flex" justify="start">
        <div
          class="picture"
          v-for="(item,index) in data.pics"
          :key="index"
          style="padding:5px;border:1px dashed #ddd;border-radius: 8%;"
        >
          <img
            :src="`${$axios.defaults.baseURL}${item.url}`"
            style="width:80px;height:80px"
            @click="showPic(item.url)"
          />
        </div>
      </el-row>
      <!-- 回复 -->
      <div class="respone">
        <a href="#maodian" @click="sendData(data.id)" v-show="isShow">回复</a>
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
      userInfo: {
        nickname: "",
        id: 0
      },
      bigPic: "",
      dialogVisible: false,
      isShow: false
    };
  },
  filters: {
    timeFormat
  },
  methods: {
    //展示图片
    showPic(url) {
      this.dialogVisible = true;
      this.bigPic = url;
    },

    //传递数据给父组件
    sendData(id) {
      this.userInfo.nickname = this.data.account.nickname;
      this.userInfo.id = id;
      this.$emit("getComment", this.userInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.responeCom {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  padding: 3px;
  // margin-bottom: 15px;

  .comment-top {
    font-size: 12px;
    margin-bottom: 10px;
    // .userInfo {
    //   // img {
    //   //   vertical-align: middle;
    //   //   width: 15px;
    //   //   // height: 14px;
    //   //   border-radius: 50%;
    //   //   box-sizing: border-box;
    //   // }
    // }

    i {
      font-size: 10px;
      color: #999;
    }
  }

  .comment-content {
    padding-left: 25px;

    .parents-content {
      border: 1px solid #ddd;
      background-color: #f9f9f9;
    }
    // .comment-text {
    //   margin-bottom: 10px;
    // }

    /deep/ .picture {
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