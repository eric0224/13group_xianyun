<template>
  <div class="search-form">
    <!-- //tab栏 -->
    <el-row class="search-tab" type="flex">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="changeTab(index)"
        :class="{active:currentTab === index}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
      <!-- <span>往返</span> -->
    </el-row>

    <el-form class="form" label-width="80px" v-if="currentTab === 0">
      <el-form-item label="出发城市" class="form-item">
        <el-autocomplete
          placeholder="请搜索出发城市"
          :fetch-suggestions="queryDepartSearch"
          v-model="form.departCity"
          @select="handleDepartSelect"
          @blur="defaultDepCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市" class="form-item">
        <!-- <el-input placeholder="请搜索到达城市"></el-input> -->
        <el-autocomplete
          placeholder="请搜索到达城市"
          :fetch-suggestions="queryDestSearch"
          v-model="form.destCity"
          @select="handleDestSelect"
          @blur="defaultDestCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          style="width:200px;"
          v-model="form.departDate"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-button class="searchBtn" type="primary" @click="searchFight">
        <i class="el-icon-search"></i> 搜索
      </el-button>
      <div class="reseverse">
        <span @click="handleReseverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      depCityArr: [], //存储后台返回的出发城市数组
      destCityArr: [] //存储后台返回的到达城市数组
    };
  },
  methods: {
    // 出发城市搜索失焦事件
    defaultDepCity() {
      this.form.departCity = this.depCityArr[0] ? this.depCityArr[0].value : "";
      this.form.departCode = this.depCityArr[0] ? this.depCityArr[0].sort : "";
    },
    //到达城市搜索框失焦事件
    defaultDestCity() {
      this.form.destCity = this.destCityArr[0] ? this.destCityArr[0].value : "";
      this.form.destCode = this.destCityArr[0] ? this.destCityArr[0].sort : "";
    },

    changeTab(index) {
      if (index === 1) {
        this.$alert("目前暂不支持往返，请选择单程机票！", "提示");
      }
    },

    //value是输入框的值
    //cb是一个回调函数，必须调用，参数的值会显示在下拉框
    //cb调用时必须接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
    //出发城市搜索
    queryDepartSearch(value, cb) {
      //如果value为空，就不需要发请求
      if (!value) {
        //传递空数组，不会有下拉框
        cb([]);
        return;
      }
      // console.log(value)
      this.$axios({
        url: "/airs/city",
        params: {
          //输入的关键字
          name: value
        }
      }).then(res => {
        // 数组
        const { data } = res.data;
        // 给数组中每个元素添加value属性
        const newArr = [];
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          //    将带有value属性的对象添加到newArr
          newArr.push(v);
        });
        this.depCityArr = newArr;
        //设置默认值
        // this.form.departCity = newArr[0].value;
        // this.form.departCode = newArr[0].sort;
        //存到cb中--显示到下拉列表中
        cb(newArr);
      });
      //   console.log(cb)
    },

    //搜索到达城市时触发的事件
    queryDestSearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      // console.log(123)
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res)
        const { data } = res.data;
        //给每一个对象添加value属性
        const newArr = [];
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          //将包含value属性的对象插入到新数组中
          newArr.push(v);
        });
        this.destCityArr = newArr;
        // //设置默认值
        // this.form.destCity = newArr[0].value;
        // this.form.destCode = newArr[0].sort;
        //显示到下拉框
        cb(newArr);
      });
    },

    //选中下拉框中元素触发的实际
    //item是当前选中的对象
    handleDepartSelect(item) {
      // 将value和sort存到form中
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 选中到达城市下拉框元素触发的事件
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    //选择日期
    handleDate(value) {
      // console.log(value)
      //转换时间格式
      this.form.departDate = Moment(value).format("YYYY-MM-DD");
    },

    //搜索机票
    searchFight() {
      //   console.log(this.form);
      const { departCity, destCity, departDate } = this.form;
      //判断非空
      if (!departCity) {
        this.$alert("请输入出发城市", "提示");
        return;
      }
      if (!destCity) {
        this.$alert("请输入到达城市", "提示");
        return;
      }
      if (!departDate) {
        this.$alert("请输入出发日期", "提示");
        return;
      }

      // //先获取本地存储
      // const arr = JSON.parse(localStorage.getItem("airs")) || [];
      // arr.push(this.form);
      // //将数据存到本地存储
      // localStorage.setItem("airs", JSON.stringify(arr));
      
      //使用vuex来存储查询历史
      this.$store.dispatch('searchHistory/setSearchHistory',this.form)

      // 跳转页面，并传递参数
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    },

    //转换出发目的地
    handleReseverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    }
  }
};
</script>

<style lang="less" scoped>
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
    position: relative;
    .form-item {
      width: 280px;
    }

    .searchBtn {
      width: 200px;
      margin-left: 80px;
    }

    .reseverse {
      position: absolute;
      top: 38px;
      right: 30px;
      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: -34px;
        width: 25px;
        height: 1px;
        background: #ccc;
      }
      &:after {
        top: 0;
      }

      &:before {
        top: 60px;
      }

      span {
        display: block;
        position: absolute;
        top: 20px;
        right: 0;
        font-size: 12px;
        background: #999;
        color: #fff;
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;

        &:after,
        &:before {
          display: block;
          content: "";
          position: absolute;
          left: 10px;
          width: 1px;
          height: 20px;
          background: #ccc;
        }

        &:after {
          top: -20px;
        }

        &:before {
          top: 20px;
        }
      }
    }
  }
}
.active {
  border-top: 2px solid #ffa500;
}
</style>
