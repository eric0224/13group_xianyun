<template>
  <div class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 搜索表单和特卖banner -->
    <el-row type="flex" justify="space-between">
      <!-- 搜素表单 -->
      <SearchForm />

      <!-- 广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>

    <!-- 声明条 -->
    <el-row class="statement">
      <el-col :span="8" class="state-item">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color: rgb(64, 158, 255);"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="state-item">
        <i class="iconfont iconbaozheng" style="color: green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8" class="state-item">
        <i class="iconfont icondianhua" style="color: rgb(64, 158, 255);"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <!-- 特价机票 -->
    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item,index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" alt />

            <el-row type="flex" class="layer-bar" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>￥{{item.price}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/air/searchForm";
import { fn } from "moment";
export default {
  data() {
    return {
      sales: []
    };
  },
  components: {
    SearchForm
  },
  mounted() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.sales = data;
    });
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  
  margin: 0 auto;

  .air-title {
    padding: 16px 0;
    font-weight: normal;
    color: #ffa500;

    span {
      // font-weight: 600;
      font-size: 22px;
    }
    i {
      font-size: 21px;
    }
  }

  .search-form {
    border: 1px solid #dddddd;
    width: 360px;
    height: 350px;
    .search-tab {
      height: 48px;
      line-height: 48px;
      span {
        display: block;
        background: #eee;
        width: 100%;
        text-align: center;
      }
    }

    .form {
      padding: 15px 50px 15px 15px;

      .form-item {
        width: 280px;
      }

      .searchBtn {
        width: 200px;
        margin-left: 80px;
      }
    }
  }

  .statement {
    height: 58px;
    text-align: center;
    margin: 20px 0;
    border: 1px solid #ddd;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    .state-item {
      border-right: 2px solid #ddd;
      height: 38px;
      line-height: 38px;
      &:last-child {
        border-right: none;
      }
      i {
        font-size: 28px;
      }
    }
  }

  .air-sale-title {
    color: #409eff;
    margin-bottom: 10px;
    span {
      font-size: 21px;
    }

    i {
      font-size: 20px;
      font-weight: normal;
    }
  }
}

.air-sale {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 50px;

  .air-sale-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
      }
    }

    .layer-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      padding: 0px 15px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}

.air-sale-group {
  margin-top: 20px;
  padding-top: 8px;
  border-right: 1px #eee solid;

  &:last-child {
    border-right: none;
  }

  .air-sale-row {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;

    .air-sale-price {
      color: orange;
      font-size: 20px;
    }
  }
}
</style>