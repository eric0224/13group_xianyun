<template>
  <div class="xsl-main">
    <!-- 表单 -->
    <div class="xsl-form-item">
      <el-autocomplete
        placeholder="目的地"
        :fetch-suggestions="queryDepartSearch"
        v-model="name"
        @select="handleDepartSelect"
      ></el-autocomplete>

      <el-date-picker
        type="daterange"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
        default-value="2010-10-01"
      ></el-date-picker>

      <el-input placeholder="人数未定" suffix-icon="el-input__icon iconfont iconuser"></el-input>

      <el-button type="primary" class="price" @click="searchFight">查看价格</el-button>
    </div>
    <!--区域部分 -->
    <div class="xsl-wenzi">
      <el-row type="flex" justify="space-between" class="xsl-ziti">
        <el-col :span="12">
          <el-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <el-col :span="4">区域 :</el-col>
            <el-col :span="20" class="xsl-lianjiekuang">
              <nuxt-link to="#" class="xsl-chaolinajie">全部</nuxt-link>
              <nuxt-link
                to="#"
                v-for="(item,index) in Cityluduan"
                :key="index"
                class="xsl-chaolinajie"
                v-show="index<i"
              >{{item.name}}</nuxt-link>
              <div class="xsl">
                <a href="#" @click="xslhanldShow">
                  <i v-show="i <= 11" class="xsl-tubiao el-icon-d-arrow-right" style="transform: rotate(90deg);color:orange;" ></i>
                  <i v-show="i > 11" class="xsl-tubiao el-icon-d-arrow-right" style="transform: rotate(270deg);color:orange;" ></i>
                  等{{Cityluduan.length}}区域
                </a>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <el-col :span="4">攻略 :</el-col>
            <el-col
              :span="20"
              class="xsl-beijing"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
          </el-row>
          <el-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <el-col :span="4" class="xsl-dingwei">
              均价&nbsp;&nbsp;&nbsp;&nbsp;:
              <el-tooltip
                class="item"
                effect="dark"
                content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                placement="top-start"
              >
                <i class="xsl-wen">?</i>
              </el-tooltip>
            </el-col>

            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-col :span="5">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i>￥332</i>
              </el-col>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-col :span="6">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i>￥521</i>
              </el-col>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom-start"
            >
              <el-col :span="8">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i>￥768</i>
              </el-col>
            </el-tooltip>
          </el-row>
        </el-col>
        <!-- 地图 -->
        <el-col :span="12" style="width:420px">
          <div id="container" justify="space-between" align="middle"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 11,
      Cityluduan: [],
      // 总数据
      hotelData: [],
      // 城市id
      Citycode: "",
      name: "南京"
    };
  },
  methods: {
    // 显示隐藏区域地段
    xslhanldShow() {
      if (this.i > 11) {
        this.i = 11;
        
      } else {
        this.i = 999;
      }
    },
    // 目的地输入框的值
    queryDepartSearch(value, cb) {
      if (!value) {
        return;
      }
      // 判断如果输入框为0
      this.$axios({
        url: "/cities",
        params: {
          name: value
        }
      }).then(res => {
        this.Cityluduan = res.data.data[0].scenics;

        // 添加属性
        const { data } = res.data;

        const newData = [];
        data.forEach(v => {
          v.value = v.name;
          newData.push(v);
          this.$store.commit("hotel/setInfoData", v.value);
        });
        this.$store.commit("hotel/setTotalPrice", data);
        cb(newData);
      });

      // console.log(this.$store.state.hotel.hotelCity[0].id);

      this.$axios({
        url: `/hotels?&city=${this.$store.state.hotel.hotelCity[0].id}`
      }).then(res => {
        console.log(res);
        // 总数据
        this.$store.commit("hotel/sethotelData", res.data);
        // data里面的数据,存到vuex到另外一个组件渲染
        // this.Cityluduan = res.data.data;
        console.log(this.$store.state.hotel.hotelData.data);
      });
    },
    // 目的地下拉选中触发
    handleDepartSelect() {
      this.$axios({
        url: `/hotels?&city=${this.$store.state.hotel.hotelCity[0].id}`
      }).then(res => {
        // console.log(res);
        // 总数据
        this.$store.commit("hotel/sethotelData", res.data);
        // data里面的数据,存到vuex到另外一个组件渲染
        // this.Cityluduan = res.data.data;
        // console.log(this.$store.state.hotel.hotelData.data);
      });
    },
    // 查找价格按钮
    searchFight() {
      if (!this.name) {
        return;
      }
      this.$axios({
        url: `/hotels?&city=${this.$store.state.hotel.hotelCity[0].id}`
      }).then(res => {
        // console.log(res);
        // 总数据
        this.$store.commit("hotel/sethotelData", res.data);
        // data里面的数据,存到vuex到另外一个组件渲染
        // this.Cityluduan = res.data.data;
        // console.log(this.$store.state.hotel.hotelData.data);
      });
    }
  },

  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: this.name
      }
    }).then(res => {
      this.Cityluduan = res.data.data[0].scenics;
    });
    // 一加载页面直接显示南京市
    this.$axios({
      url: `/hotels?&city=74`
    }).then(res => {
      console.log(res);
      // 总数据
      this.$store.commit("hotel/sethotelData", res.data);
      this.$store.commit("hotel/setInfoData", res.data.data[0].city.name);
    });
    // 等待下面url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图， container是容器的id
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.8718107, 31.32846821] //中心点坐标
      });

      // 创建一个 Marker 实例：
      var marker1 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.8718107, 31.32846821),
        title: "好来阁商务宾馆酒店",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">1</div>`
      });
      var marker2 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.92251, 31.75561),
        title: "得月楼饭店",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">2</div>`
      });
      var marker3 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.922375, 32.101576),
        title: "日出花园艺术酒店(南京仙林大学城店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">3</div>`
      });
      var marker4 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.732841, 32.077242),
        title: "南京世茂滨江希尔顿酒店",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">4</div>`
      });
      var marker5 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.881561, 31.701331),
        title: "协春园旅馆(南京禄口机场店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">5</div>`
      });
      var marker6 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.754533, 32.092903),
        title: "古南都大桥饭店",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">6</div>`
      });
      var marker7 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.903576, 31.33001),
        title: "漫耕假日酒店(原全季酒店高淳店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">7</div>`
      });
      var marker8 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.882451, 31.323772),
        title: "漫耕假日酒店(原全季酒店高淳店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">8</div>`
      });
      var marker9 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.787727, 32.057976),
        title: "漫耕假日酒店(原全季酒店高淳店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">9</div>`
      });
      var marker10 = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: new AMap.LngLat(118.732506, 32.126942),
        title: "7天连锁酒店(南京长江大桥店)",
        content: `<div style="width:20px; height:20px; background-color:#409eff; border-radius: 50%; color:#fff;line-height:20px; text-align:center;">10</div>`
      });
      map.add([
        marker1,
        marker2,
        marker3,
        marker4,
        marker5,
        marker6,
        marker7,
        marker8,
        marker9,
        marker10
      ]);
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=c9225d08b926cd71dc686e19fbbc8769&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped lang="less">
#container {
  height: 260px;
}
.xsl-main {
  width: 1000px;
  margin: 0 auto;
  .xsl-form-item {
    margin-bottom: 20px;
    .xsl-input {
      margin-right: 10px;
    }
    /deep/ .el-input {
      width: 202px;
      height: 40px;
    }
    .price {
      margin-left: 15px;
    }
  }
  .xsl-wenzi {
    width: 1000px;
    margin-bottom: 20px;
    .xsl-ziti {
      font-size: 14px;
      color: #666666;
      .xsl-dingwei {
        position: relative;
        .xsl-wen {
          display: block;
          width: 15px;
          height: 15px;
          font-size: 12px;
          border-radius: 50%;
          background-color: #ccc;
          text-align: center;
          color: #ffff;
          position: absolute;
          top: 0px;
          left: 30px;
        }
      }
      .xsl-lianjiekuang {
        .xsl-chaolinajie {
          padding-right: 10px;
          &:hover {
            color: #0099ff;
            text-decoration: underline;
          }
        }
      }
    }
    .xsl-left {
      width: 590px;
    }
    span {
      display: block;
      width: 100px;
    }
    .beijing {
      float: left;
    }
    i {
      color: orange;
      &:last-child {
        color: black;
      }
    }
  }
}
</style>