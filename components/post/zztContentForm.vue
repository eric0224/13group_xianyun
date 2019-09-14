<template>
  <div class="zzt_content">
    <el-input placeholder="请输入想去的地方,比如:  '广州'" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-row type="flex" justify="space-between" class="tj-el-row">
      <el-col :span="24">
        <span>推荐:</span>
        <router-link to="#">广州</router-link>
        <router-link to="#">上海</router-link>
        <router-link to="#">北京</router-link>
      </el-col>
    </el-row>
    <el-row class="search-tab" type="flex" justify="space-between">
      <nuxt-link to>推荐攻略</nuxt-link>
      <el-button type="primary" icon="el-icon-edit">写游记</el-button>
    </el-row>
    <!-- 文章 -->
    <div class="post-item" v-for="(item,index) in articledata" :key="index">
      <nuxt-link to>
        <h4>{{item.title}}</h4>
        <P>{{item.summary}}</P>

        <el-row type="flex" justify="space-between" class="zzt_img" v-if="item.images.length>=3">
          <template>
            <img v-for="(item2,index) in item.images" :key="index" :src="item2" />
          </template>
        </el-row>
      </nuxt-link>
      <!-- 定位/用户/点赞 -->
      <div class="zzt_location">
        <i class="el-icon-location">{{item.cityName}}&nbsp;&nbsp;by</i>
        <i class="zzt_user">{{item.account.nickname}}</i>
        <i class="el-icon-view">{{item.watch}}</i>
        <span>{{item.like||0}}赞</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articledata: [],
      currentTab: 0
    };
  },
  methods: {},
  mounted() {
    //请求文章列表
    this.$axios({
      url: "/posts",
      params: { city: [] }
    }).then(res => {
      console.log(res);
      this.articledata = res.data.data;
      console.log(this.articledata);
    });
  }
};
</script>

<style scoped lang="less">
.zzt_content {
  .input-with-select {
    border: 3px solid #ffa500;
    border-radius: 5px;
  }
  .tj-el-row {
    padding: 10px 0;
    font-size: 12px;
    color: #666;
  }
  .search-tab {
    height: 48px;
    line-height: 48px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    a {
      display: block;
      font-weight: 400;
      font-size: 18px;
      color: orange;
      margin-bottom: -10px;
      border-bottom: 3px solid orange;
    }
  }
  .active {
    border-top: 2px solid #ffa500;
  }
  //   文章
  .post-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    h4 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 15px;
      &:hover {
        color: orange;
      }
    }
    p {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 14px;
      height: 63px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      color: #666;
    }
    .zzt_img {
      img {
        width: 220px;
        height: 150px;
       
      }
    }
  }
  //定位/用户/点赞
  .zzt_location {
    padding: 10px 0;
    i {
      margin-right: 10px;
      font-size: 12px;
      color: #999;
    }
    .zzt_user {
      color: orange;
    }
    span {
      float: right;
      font-size: 16px;
      color: orange;
    }
  }
}
</style>