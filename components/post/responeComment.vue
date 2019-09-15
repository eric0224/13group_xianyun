<template>
  <div class="responeCom">
    <item :data="data.parent" v-if="data.parent" />
    <!-- 头部信息 -->
    <el-row class="comment-top" type="flex" justify="space-between">
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
      <div class="picture" v-for="(item,index) in data.pics" :key="index">
        <img :src="item" />
      </div>
    </el-row>
    <!-- 回复 -->
    <div class="respone">
      <a href="javaScript:viod(0)">回复</a>
    </div>
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
  filters: {
    timeFormat
  }
};
</script>

<style lang="less" scoped>
.responeCom {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 15px;

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
    padding-left: 25px;

    .parents-content {
      border: 1px solid #ddd;
      background-color: #eee;
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
      font-size: 12px;
      color: #1e50a2;
      text-align: right;
      // display: none;
    }
}
</style>