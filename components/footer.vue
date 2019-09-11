<template>
  <div class="footer">
    <div class="main">
      <div class="infoList">
        <el-row>
          <el-col :span="6">
            <dl>
              <dt>
                <h5>闲云旅游旅游网</h5>
              </dt>
              <dd>上亿旅行者共同打造的"旅行神器"</dd>
              <dd><span>60,000</span> 多个全球旅游目的地</dd>
              <dd><span>600,000</span> 个细分目的地新玩法</dd>
              <dd><span>760,000,000</span> 次攻略下载</dd>
              <dd><span>38,000</span> 家旅游产品供应商</dd>
            </dl>
          </el-col>
          <el-col :span="6">
            <dl>
              <dt>
                <h5>关于我们</h5>
              </dt>
              <dd>隐私政策 商标声明</dd>
              <dd>服务协议 游记协议</dd>
              <dd>商城平台服务协议</dd>
              <dd>网络信息侵权通知指引</dd>
              <dd>闲云旅游旅游网服务监督员</dd>
              <dd>网站地图加入闲云旅游</dd>
            </dl>
          </el-col>
          <el-col :span="6">
            <dl>
              <dt>
                <h5>旅行服务</h5>
              </dt>
              <dd>旅游攻略 酒店预订</dd>
              <dd>旅游特价 国际租车</dd>
              <dd>旅游问答 旅游保险</dd>
              <dd>旅游指南 订火车票</dd>
              <dd>旅游资讯 APP下载</dd>
            </dl>
          </el-col>
          <el-col :span="6" class="scan">
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
            <p>关注我们</p>
          </el-col>
        </el-row>
      </div>
      <div class="licence">
          <p>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  color: #ccc;
  background: #333333;
  width: 100%;
  height: 329px;
}
.main {
  width: 1000px;
  margin: 0 auto;
  padding: 30px 0 0;
  .infoList {
    dl {
      dt {
        h5 {
          font-size: 16px;
          margin-bottom: 10px;
        }
      }
      dd {
        margin-bottom: 5px;
        font-size: 12px;
        span{
            color:#ffa500
        }
      }
    }

    .scan {
      text-align: center;
      font-size: 12px;  
      img {
        width: 140px;
        height: 140px;
        margin: 0 auto;
      }
    }
  }

  .licence{
      border-top: 1px solid #666666;
      margin-top: 20px;
      padding-top: 50px;
      text-align: center;
      p{
          font-size: 12px
      }
  }
}
</style>