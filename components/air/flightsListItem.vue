<template>
  <div class="flight-item">
    <div @click="isShow = !isShow">
      <!-- //显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{flightTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price/2}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="isShow">
      <!-- 隐藏的机票信息 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleSelect(item.seat_xid)">选定</el-button>
              <p>剩余:{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  //单向数据流传值
  //data的类型不确定，会出现引用的错误
  //props:['data']
  props: {
    //data表示组件可以接受的属性
    data: {
      //type不能改变，用于声明属性的类型
      type: Object,
      //如果调用对象不传值，采用default的默认值
      default: {}
    }
  },
  data() {
    return {
        isShow:false
    };
  },
  methods:{
    // 选定机票触发的事件
    handleSelect(seat_xid){
      //跳转到机票订单页面
      this.$router.push({
        path:'/air/order',
        query:{
          id:this.data.id,
          seat_xid
        }
      })
    }
  },
  computed: {
    //用计算属性来计算飞行时间
    flightTime() {
      //出发、到达时间--是一个数组
      const dep = this.data.dep_time.split(":");
      const arr = this.data.arr_time.split(":");
      //如果到达时间小于出发时间，说明到达时间是第二天，给到达时间加上24即可
      if (arr[0] < dep[0]) {
        arr[0] += 24;
      }
      // 将出发时间和到达时间转换成分钟数
      const dep_min = dep[0] * 60 + +dep[1];
      const arr_min = arr[0] * 60 + +arr[1];
      //算出时间差的分钟数
      const dis = arr_min - dep_min;
      //将分钟数转回时间
      const min = dis % 60;
      //向下取整获得小时数
      const hour = Math.floor(dis / 60);
      return `${hour}时${min}分`;
    }
  }
};
</script>

<style lang="less" scoped>
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>