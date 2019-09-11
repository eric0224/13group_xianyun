<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥{{$store.state.air.totalPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-main-content">
          <div class="scan-canvas">
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <span>扫二维码支付</span>
          </div>
          <div class="pay-sample">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode  from "qrcode";
export default {
  mounted() {
    setTimeout(() => {
      const { id } = this.$route.query;
      this.$axios({
        url: `/airorders/${id}`,
        headers:{
            Authorization: ` Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(res);
        const {code_url} = res.data.payInfo
        //获取canvas节点元素
        let canvas = document.getElementById('qrcode-stage')
        QRCode.toCanvas(canvas,code_url,{
            width:200
        })
      });
    }, 10);
  }
};
</script>


<style lang="less" scoped>
.container {
  padding: 30px 0;
  background: #f5f5f5;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .pay-title {
    text-align: right;

    span {
      font-size: 28px;
      color: #ff4500;
    }
  }

  .pay-main {
    margin-top: 10px;
    background: #fff;
    border-top: 5px solid #ffa500;
    padding: 30px 30px;

    h4 {
      font-size: 28px;
      font-weight: normal;
      margin-bottom: 10px;
    }

    .pay-main-content {
      padding: 0 60px;
      .scan-canvas {
        width: 232px;
        height: 310px;
        border: 1px solid #ddd;
        text-align: center;
        padding: 15px;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>