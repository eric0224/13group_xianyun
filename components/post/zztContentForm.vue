<template>
  <div class="zzt_content">
    <input placeholder="请输入想去的地方,比如:  '广州'" class="input-with-select" />
    <el-row type="flex" justify="space-between" class="tj-el-row">
      <el-col :span="24">
        <span>推荐:</span>
        <nuxt-link to="#">广州</nuxt-link>
        <nuxt-link to="#">上海</nuxt-link>
        <nuxt-link to="#">北京</nuxt-link>
      </el-col>
    </el-row>
    <el-row class="search-tab" type="flex" justify="space-between">
      <nuxt-link to>推荐攻略</nuxt-link>
      <el-button type="primary" icon="el-icon-edit" @click="btnCreate">写游记</el-button>
    </el-row>
    <!-- 文章列表 -->

    <div class="post-item" v-for="(item,index) in dataList" :key="index">
      <!-- ------------第一结构----------- -->
      <nuxt-link to v-if="item.images.length>=3">
        <h4>{{item.title}}</h4>
        <p>{{item.summary}}</p>
        <el-row type="flex" justify="space-between" class="zzt_img">
          <template>
            <img v-for="(item2,index) in item.images" :key="index" :src="item2" v-show="index<3" />
          </template>
        </el-row>
      </nuxt-link>
      <!-- ------------第二结构------------- -->
      <nuxt-link to v-if="item.images.length<3" class="zzt-imgss">
        
        <!-- <el-row :span="24" type="flex" justify="space-between" class="zzt_imgs"> -->
          <div class="zzt_imgs">
           <div class="imgs"><img :src="item.images[0]" alt="" class="img"></div>
           <div  class="zzt-imgdiv">
              <h4>{{item.title}}</h4>
              <p>{{item.summary}}</p>
           </div>
          </div>
          <!-- <el-col :span="14" class="imgs">
            <img :src="item.images[0]" />
          </el-col>
          <el-col :span="10">{{item.summary}}</el-col>
        </el-row> -->
      </nuxt-link>
      <!-- 定位/用户/点赞 -->
      <div class="zzt_location">
        <i class="el-icon-location">{{item.cityName}}&nbsp;&nbsp;by</i>
        <i class="zzt_user">{{item.account.nickname}}</i>
        <i class="el-icon-view">{{item.watch}}</i>
        <span>{{item.like||0}}赞</span>
      </div>
    </div>
    <!-- 分页结构 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleData: [],
      currentTab: 0,

      pageIndex: 1, //分页默认1页
      pageSize: 2,
      total: 0,
      //声明一个显示当前页的数的数组
      dataList: []
    };
  },
  methods: {
    // 跳转富文本
    btnCreate() {
      this.$router.push({
        path: "//post/create"
      });
    },
    // 每页切换的条数,这val是页数
    handleSizeChange(val) {
      this.pageSize = val;
      // 点击后返回刷新为val值页码;
      this.dataList = this.articleData.slice(0, val);
    },

    // 1.点击切换页码时候触发,val是点击的页码
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val; //当前页
      this.dataList = this.articleData.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  mounted() {
    //请求文章列表
    this.$axios({
      url: "/posts",
      params: { city: [] }
    }).then(res => {
      console.log(res);
      this.articleData = res.data.data;
      // console.log(this.articledata);

      // 分页总条数
      this.total = this.articleData.length;
      //第一页的值
      this.dataList = this.articleData.slice(0, this.pageSize);
    });
  }
};
</script>

<style scoped lang="less">
.zzt_content {
  .input-with-select {
    border: 0; // 去除未选中状态边框
    outline: none; // 去除选中状态边框
    border: 3px solid #ffa500;
    width: 100%;
    height: 40px;
    text-indent: 1em;
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

    // 第二结构
    .zzt-imgss {
      h4 {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 15px;
        &:hover {
          color: orange;
        }
      }
      .zzt-imgs {
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        color: #666;
        .imgs {
          width: 220px;
          height: 150px;
         img {
            width: 100%;
          }
        }
        .zzt-imgdiv{
          float: left;
        }
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