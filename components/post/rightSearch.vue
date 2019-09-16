<template>
  <div class="right">
    <div class="search">
      <input type="text" placeholder="请输入想去的地方,比如:'广州" v-model="search" @keyup.13="init1" />
      <i class="el-icon-search" @click="init1"></i>
    </div>
    <div class="recomm">
      <span>推荐:</span>
      <span @click="assignmentBtn('广州')">广州</span>
      <span @click="assignmentBtn('上海')">上海</span>
      <span @click="assignmentBtn('北京')">北京</span>
    </div>
    <el-row type="flex" justify="space-between" class="strategy">
      <el-col :span="4">
        <h4>推荐攻略</h4>
      </el-col>
      <el-col :span="4" style="width:102px">
        <nuxt-link to="/post/create">
          <el-button type="primary" icon="el-icon-edit">写游记</el-button>
        </nuxt-link>
      </el-col>
    </el-row>
    <el-row class="line">
      <i></i>
    </el-row>
    <!-- 文章列表 -->
    <el-row
      class="article"
      v-for="(item,index) in articleList1"
      :key="item.id"
      v-show="articleList1[index].images.length>=3"
    >
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <h4>{{item.title}}</h4>
      </nuxt-link>
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <p>
          <span>{{item.summary}}</span>
          <span>
            <img :src="`${item.images[0]}`" alt />
            <img :src="`${item.images[1]}`" alt />
            <img :src="`${item.images[2]}`" alt />
          </span>
        </p>
      </nuxt-link>
      <div class="userInfo">
        <span class="el-icon-location-outline">{{item.cityName}} by</span>
        <span>
          <img
            :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
            alt
          />
          <span class="one">{{$store.state.user.userInfo.user.nickname}}</span>
        </span>
        <span class="el-icon-view">{{item.watch}}</span>
        <span class="fr">
          <i>51</i>赞
        </span>
      </div>
    </el-row>
    <el-row
      v-for="(item1,index) in articleList1"
      :key="index"
      v-show="articleList1[index].images.length<3"
    >
      <div class="userInfo1 clearfix">
        <div class="userInfo_img fl">
          <img :src="`${item1.images[0]}`" alt />
        </div>
        <div class="userInfo_content fr">
          <nuxt-link :to="`/post/detail?id=${item1.id}`">
            <h4>{{item1.title}}</h4>
          </nuxt-link>
          <nuxt-link :to="`/post/detail?id=${item1.id}`">
            <p>
              <span>{{item1.summary}}</span>
            </p>
          </nuxt-link>
          <div class="userInfo">
            <span class="el-icon-location-outline">{{item1.cityName}} by</span>
            <span>
              <img
                :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
                alt
              />
              <span class="one">{{$store.state.user.userInfo.user.nickname}}</span>
            </span>
            <span class="el-icon-view">{{item1.watch}}</span>
            <span class="fr">
              <i>51</i>赞
            </span>
          </div>
        </div>
      </div>
    </el-row>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- //无数据的时候显示 -->
      <div class="show-none" v-show="articleList1.length === 0">暂无推荐攻略信息!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      total: 0,
      search: [],
      articleList: [],
      articleList1: []
    };
  },
  watch: {
    // watch可以监听this下的所有属性
    $route() {
      // 请求航班列表数据
      // this.getData();
      this.init();
    },
    search() {
      this.init1();
    }
  },
  // computed: {
  //   search: {
  //     set(nv) {
  //       this.search=nv
  //     },
  //     get() {
  //       // this.init()
  //       return this.$route.query.city;
  //     }
  //   }
  // },
  methods: {
    assignmentBtn(value) {
      this.search=value
      this.init1()
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.articleList1 = this.articleList.slice(0, val);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      // console.log(`当前页: ${val}`);
      this.articleList1 = this.articleList.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageSize * this.pageNum
      );
    },
    init() {
      this.$axios({
        url: "/posts",
        // params: { city: this.search ? this.search : undefined }
        params: { city: this.$route.query.city }
      }).then(res => {
        console.log(this.$route.query.city);
        this.total = res.data.total;
        this.articleList = res.data.data;
        this.articleList1 = this.articleList.slice(0, this.pageSize);
      });
    },
    init1() {
      this.$axios({
        url: "/posts",
        params: { city: this.search ? this.search : undefined }
        // params: { city: this.$route.query.city }
      }).then(res => {
        // console.log(this.$route.query.city);
        this.total = res.data.total;
        this.articleList = res.data.data;
        this.articleList1 = this.articleList.slice(0, this.pageSize);
      });
    }
  },
  mounted() {
    this.init1();
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 700px;
  height: 40px;
  border: 3px solid #ffa500;
  box-sizing: border-box;
  input {
    padding: 0 20px;
    height: 34px;
    line-height: 34px;
    border: none;
    width: 616px;
    outline-style: none;
  }
  i {
    font-size: 24px;
    color: #ffa500;
    vertical-align: middle;
  }
}
.recomm {
  font-size: 12px;
  color: #666;
  padding: 10px;
  span {
    padding-right: 5px;
    &:hover:not(:first-child) {
      cursor: pointer;
      color: #ffa500;
      text-decoration: underline;
    }
  }
}

.strategy {
  padding-bottom: 7px;
  h4 {
    font-size: 16px;
    padding: 10px 0;
    font-weight: 400;
    color: #ffa500;
  }
}
.line {
  border-bottom: 1px solid #ddd;
  i {
    display: block;
    width: 64px;
    border-bottom: 3px solid #ffa500;
  }
}

.article {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  h4 {
    font-size: 18px;
    font-weight: 400;
    &:hover {
      color: #ffa500;
    }
  }
  p {
    span {
      display: block;
      font-size: 14px;
      color: #666;
      padding: 15px 0 0 0;
      overflow: hidden;
      &:first-child {
        height: 55px;
        overflow: hidden;
      }
      img {
        width: 220px;
        height: 150px;
        &:nth-child(2) {
          margin: 0 13px;
        }
      }
    }
  }
}
.userInfo {
  margin-top: 10px;
  span {
    display: inline-block;
    font-size: 12px;
    color: #999;
    margin-right: 5px;
    &:nth-child(2) {
      margin-right: none;
    }
    &:nth-child(4) {
      font-size: 16px;
      color: #ffa500;
    }
    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      border-radius: 50%;
    }
    span {
      color: #ffa500;
    }
  }
}
.userInfo1 {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  .userInfo_img {
    width: 220px;
    img {
      width: 220px;
      height: 150px;
    }
  }
  .userInfo_content {
    width: 470px;
    h4 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 18px;
      font-weight: 400;
      &:hover {
        color: #ffa500;
      }
    }
    p {
      span {
        display: block;
        font-size: 14px;
        color: #666;
        padding: 15px 0 0 0;
        overflow: hidden;
        &:first-child {
          height: 55px;
          overflow: hidden;
        }
      }
    }
    .userInfo {
      margin-top: 25px;
    }
  }
}

.block {
  margin-top: 15px;
  text-align: center;
}

.show-none {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #aaa;
}
</style>