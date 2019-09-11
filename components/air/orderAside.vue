<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{data.arr_date}}</div>
        <div>{{data.org_city_name}}-{{data.dst_city_name}}</div>
      </el-row>
      <el-row class="info-step" type="flex" justify="space-between">
        <el-col :span="5" class="flight-airport">
          <strong>{{data.dep_time}}</strong>
          <span>{{data.org_airport_name}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>{{rankTime}}</span>
          <span>{{data.airline_name}}{{data.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{data.arr_time}}</strong>
          <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
        </el-col>
      </el-row>

      <el-row class="info-bar" type="flex" justify="space-between">
        <span>订单总价</span>
        <span>金额</span>
        <span>数量</span>
      </el-row>

      <el-row class="info-bar" type="flex" justify="space-between">
        <span>成人机票</span>
        <span>￥{{data.seat_infos.org_settle_price}}</span>
        <span>X1</span>
      </el-row>

      <el-row class="info-bar" type="flex" justify="space-between">
        <span>机建+燃油</span>
        <span>￥{{data.airport_tax_audlet}}/人/单程</span>
        <span>X1</span>
      </el-row>

      <el-row class="info-bar" type="flex" justify="space-between" align="middle">
        <span>应付总额</span>
        <span class="price">￥{{$store.state.air.totalPrice}}</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
          
        }
    },
    computed:{
        rankTime(){
            // 数据还未请求回来
            if(!this.data.dep_time) return "";

            // 转化为分钟
            const dep = this.data.dep_time.split(":");
            const arr = this.data.arr_time.split(":");
            const depVal = dep[0] * 60 + +dep[1];
            const arrVal = arr[0] * 60 + +arr[1];

            // 到达时间相减得到分钟
            let dis = arrVal - depVal;

            // 如果是第二天凌晨时间段，需要加24小时
            if(dis < 0){
                dis = arrVal + 24 * 60 - depVal;
            }

            // 得到相差时间
            return `${ Math.floor(dis / 60)}时${dis % 60}分`
        }
    }
};
</script>

<style lang="less" scoped>
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  .info-top {
    padding: 15px 15px 0;

    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    padding: 15px;
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>