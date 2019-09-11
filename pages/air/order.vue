<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <OrderForm/>
      </div>

        <!-- 订单表单 -->
      <!-- <div class="orderForm"></div> -->
      <OrderAside :data="$store.state.air.infoData"/>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    data(){
        return{
            //储存订单总数据
            orderData:{}
        }
    },
    components:{
        OrderForm,OrderAside
    },
    
};
</script>

<style lang="less" scoped>
.container{
    width: 1000px;
    margin: 20px auto;
}
</style>