<template>
  <div class="main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav"  v-for="(item,index) in hotelData " :key="index">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{item.real_city}}酒店</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 酒店地址与图片 -->
    <div class="local" v-for="(item,index) in hotelData " :key="index">
      <h2 >
        {{item.name}}
        <span>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
        </span>
      </h2>
      <span>{{item.alias}})</span>
      <div>
        <i data-v-3cab31ba class="iconfont iconlocation"></i>
        {{item.address}}
      </div>
    </div>

    <!-- 图片展示 -->
    <div class="photo el-row" >
      <div class="photoLeft el-col-16">
        <img src="@/assets/pages/1.jpeg" alt />
      </div>

      <div class="el-col-8 photoRight">
        <div class="el-row">
          <div class="el-col-12">
            <img src="@/assets/pages/1.jpeg" alt />
          </div>
          <div class="el-col-12">
            <img src="@/assets/pages/2.jpeg" alt />
          </div>
          <div class="el-col-12">
            <img src="@/assets/pages/3.jpeg" alt />
          </div>
          <div class="el-col-12">
            <img src="@/assets/pages/4.jpeg" alt />
          </div>
          <div class="el-col-12">
            <img src="@/assets/pages/5.jpeg" alt />
          </div>
          <div class="el-col-12">
            <img src="@/assets/pages/6.jpeg" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- 酒店价格 -->
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column width="400px" prop="name" label="价格来源"></el-table-column>
      <el-table-column width="400px" prop="bestType" label="低价房型"></el-table-column>
      <el-table-column width="200px" prop="price" label="最低价格/每晚"></el-table-column>
    </el-table>

    <!-- 地图 -->
    <div class="map">
      <div id="container"></div>
      <div class="rightBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="com">
              <span>高淳老街</span>
              <span>1.03公里</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">交通</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="baseInfo" v-for="(item,index) in hotelData" :key="index">
      <el-row type="flex">
          <span>基本信息</span>
          <span>入住时间: 14:00之后</span>
          <span>离店时间: 12:00之前</span>
          <span>{{item.creation_time}} / {{item.renovat_time}}</span>
          <span>酒店规模: {{item.roomCount}}间客房</span>
      </el-row>
    </div>

    <!-- 用户评论 -->
    <div class="userDis" v-for="(item,index) in hotelData" :key="index">
      <h4>0条真实用户评论</h4>
      <div class="disList el-row" style="display:flex">
        <div class="goodDis el-col-4" >
          <span>总评数:163</span>
          <br />
          <span>好评数:51</span>
          <br />
          <span>差评数:7</span>
        </div>
        <div class="start el-col-4">
          <div class="score">
            <span>
              <i class="el-icon-star-on"></i>
            </span>
            <span>
              <i class="el-icon-star-on"></i>
            </span>
            <span>
              <i class="el-icon-star-on"></i>
            </span>
            <span>
              <i class="el-icon-star-on"></i>
            </span>
            <span>
              <i class="el-icon-star-on"></i>
            </span>
            <span>{{item.stars}}分</span>
          </div>
          <div class="sales">推荐</div>
        </div>
        <div class="gradeList el-col-12">
          <svg>
            <circle cx="100" cy="50" r="40" stroke="#ffac30" stroke-width="2" fill="#ffffff" />
            <text x="85" y="50" fill="#ffac30" style="font-size:15px">环境</text>
            <text x="90" y="70" fill="#ffac30" style="font-size:15px">{{item.scores.environment}}</text>
          </svg>
          <svg>
            <circle cx="100" cy="50" r="40" stroke="#ffac30" stroke-width="2" fill="#ffffff" />
            <text x="85" y="50" fill="#ffac30" style="font-size:15px">产品</text>
            <text x="90" y="70" fill="#ffac30" style="font-size:15px">{{item.scores.product}}</text>
          </svg>
          <svg>
            <circle cx="100" cy="50" r="40" stroke="#ffac30" stroke-width="2" fill="#ffffff" />
            <text x="85" y="50" fill="#ffac30" style="font-size:15px">服务</text>
            <text x="90" y="70" fill="#ffac30" style="font-size:15px">{{item.scores.service}}</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 酒店总数据
        hotelData:[],
        tableData: [],
        // 酒店地址
        location:{
            longitude:118.787727,
            latitude:32.057976
        },
        title:"南京古都文化酒店（鼓楼店）(如家联盟)"
    };
  },

  mounted() {
    //   酒店数据2
    this.$axios({
        url:"/hotels/options",
    }).then((res)=>{
    console.log(res)
    })

    //   酒店数据
    this.$axios({
        url:"/hotels",
        method:"GET",
        params:{ id:18 },
    }).then((res)=>{
        this.hotelData=res.data.data;
        this.tableData=res.data.data[0].products
        // this.location= res.data.data[0].location
        // this.title= res.data.data[0].name
        console.log(this.title)
        console.log(this.tableData)
        console.log(res)
        console.log(this.hotelData)
    });

    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.787727,32.057976 ] //中心点坐标
      });

      // 点标记
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(118.787727,32.057976 ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "酒店",
        image: "https://vdata.amap.com/icons/b18/1/2."
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=5414b44a6e69c298bada7dba1966a2b4&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped lang="less">
.main {
  width: 1000px;
  margin: 0 auto;

  .nav {
    padding: 20px 0;
    font-size: 18px;
  }

  .local {
    color: #66667f;
    h2 {
      color: #333333;
      font-size: 32px;
      font-weight: 300;
      span {
        color: #ff9b5a;
        i {
          font-size: 20px;
        }
      }
    }
  }

  .photo {
    margin-top: 30px;
    .photoLeft {
      img {
        height: 360px;
        width: 640px;
      }
    }

    .photoRight {
      justify-content: space-between;
      img {
        width: 160px;
        height: 110px;
        margin-bottom: 10px;
      }
    }
  }

  .map {
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
    #container {
      width: 600px;
      height: 400px;
    }

    .rightBox {
      width: 330px;
      .com {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .baseInfo {
    margin: 40px 0;
    span{
        margin-right: 20px;
        &:nth-child(1){
            margin-right: 50px;
        }
    }
  }

  .userDis {
    margin: 40px 0;
    h4 {
      margin: 10px 0;
      font-size: 20px;
    }

    .disList {
      height: 114px;
      .goodDis {
        font-size: 20px;
        color: #666892;
      }
      .start {
        position: relative;
        height: 74px;
        display: flex;
        align-items: center;
        font-size: 20px;
        span {
          font-size: 18px;
          color: #fa3;
        }
        span:nth-child(5) {
          i {
            color: #666892;
          }
        }
        .sales {
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 25px;
          color: #fa3;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
          border-radius: 50%;
          border: 2px solid #fa3;
          transform: rotate(-30deg);
        }
      }
      .gradeList {
        display: flex;
      }
    }
  }
}
</style>