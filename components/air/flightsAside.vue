<template>
  <div class="aside">
    <!-- 声明部分    -->
    <div class="statement">
      <el-row class="statement-item" type="flex" justify="space-between">
        <el-col :span="8">
          <span class="iconfont iconweibiaoti-_huabanfuben" style="color: rgb(64, 158, 255);"></span>
          <i>航协认证</i>
        </el-col>
        <el-col :span="8">
          <span class="iconfont iconbaozheng" style="color: green;"></span>
          <i>出行保证</i>
        </el-col>
        <el-col :span="8">
          <span class="iconfont icondianhua" style="color: rgb(64, 158, 255);"></span>
          <i>7x24</i>
        </el-col>
      </el-row>
      <p class="phone-service">免费客服电话 : 4006345678</p>
    </div>
    <!-- 历史查询 -->
    <div class="history">
      <h5 class="history-refer">历史查询</h5>
      <nuxt-link
        :to="`?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
        v-for="(item,index) in history"
        :key="index"
      >
        <el-row class="history-item" type="flex" align="middle" justify="space-between">
          <div class="air-info">
            <div class="to-from">{{item.departCity}} - {{item.destCity}}</div>
            <p>{{item.departDate}}</p>
          </div>
          <span>选择</span>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: []
    };
  },
  mounted() {
    // const arr = JSON.parse(localStorage.getItem("airs")) || [];
    //   console.log(arr)
    setTimeout(() => {
      //使用vuex的方式
      const arr = this.$store.state.searchHistory.searchHistory;
      // console.log(this.$store.state)
      console.log(arr);
      this.history = arr;
    }, 10);
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 240px;
  height: 700px;
  font-size: 12px;

  .statement {
    width: 240px;
    height: 115px;
    border: 1px solid #dddddd;
    margin-bottom: 20px;
    .statement-item {
      padding: 10px;

      > div {
        text-align: center;
        span {
          display: block;
          font-size: 44px;
          margin-bottom: 5px;
        }
      }
    }

    .phone-service {
      font-size: 14px;
      display: block;
      padding: 5px;
      background-color: #eee;
    }
  }

  .history {
    border: 1px solid #ddd;
    width: 240px;
    padding: 10px;
    box-sizing: border-box;
    .history-refer {
      display: block;
      border-bottom: 1px solid #ddd;
      padding: 0 0 10px;
      font-size: 16px;
      font-weight: normal;
    }

    .history-item {
      margin-top: 10px;
      font-size: 14px;
      .to-from {
        margin-bottom: 5px;
      }

      p {
        font-size: 12px;
      }

      span {
        display: block;
        background: #ffa500;
        padding: 2px 10px;
        color: #fff;
        border-radius: 12%;
        font-size: 12px;
      }
    }
  }
}
</style>