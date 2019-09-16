<template>
  <div class="main">
    <div class="xsl-form">
      <el-row type="flex" justify="space-between" class="xsl-bian">
        <el-col :span="8" class="xsl-cebian">
          <el-row type="flex" justify="space-between" class="xsl-jianju">
            <el-col :span="24">价格</el-col>
            <el-col :span="24">0-4000</el-col>
          </el-row>
          <el-slider v-model="value1" :max="4000" style="width:200px;" change="hanldPrice"></el-slider>
        </el-col>
        <el-col :span="6" class="xsl-cebian">
          <el-row type="flex" class="xsl-jianju">
            <el-col :span="24">住宿等级</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-dropdown border placement="bottom-start">
                <span class="el-dropdown-link">
                  不限
                  <i class="el-icon-arrow-down el-icon--right" style="margin-left:80px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:200px;font-weight: normal;">
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">1星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">2星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">3星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">4星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">5星</el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="xsl-cebian">
          <el-row type="flex" class="xsl-jianju">
            <el-col :span="24">住宿类型</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-dropdown border placement="bottom-start">
                <span class="el-dropdown-link">
                  不限
                  <i class="el-icon-arrow-down el-icon--right" style="margin-left:80px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:200px;font-weight: normal;">
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">经济型</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">舒适型</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">高档型</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">豪华型</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">度假村</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">公寓式酒店</el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="xsl-cebian">
          <el-row type="flex" class="xsl-jianju">
            <el-col :span="24">酒店设施</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-dropdown border placement="bottom-start">
                <span class="el-dropdown-link">
                  不限
                  <i class="el-icon-arrow-down el-icon--right" style="margin-left:80px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:200px;font-weight: normal;">
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">wifi</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">热水壶</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">吹风机</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">外币兑换服务</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">洗衣服务</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">电梯</el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="xsl-cebian">
          <el-row type="flex" class="xsl-jianju">
            <el-col :span="24">酒店品牌</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-dropdown border placement="bottom-start">
                <span class="el-dropdown-link">
                  不限
                  <i class="el-icon-arrow-down el-icon--right" style="margin-left:80px;"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width:200px;font-weight: normal;">
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">1星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">2星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">3星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">4星</el-checkbox>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-checkbox v-model="checked">5星</el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店列表 -->
    <div class="hotel-list">
      <el-row type="flex" justify="space-between" v-for="(item,index) in $store.state.hotel.hotelData.data" in :key="index">
        <el-col :span="8">
          <nuxt-link to="#">
            <img :src="`${item.photos}`" />
          </nuxt-link>
        </el-col>
        <el-col :span="10">
          <h4>{{item.name}}</h4>
          <div class="xsl-xiangqing">
            <span class="xsl-yingwen">{{item.alias}}</span>
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            <span class="xsl-yingwen">经济型</span>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <i class="el-rate__icon el-icon-star-on"></i>
              <i class="el-rate__icon el-icon-star-on"></i>
              <i class="el-rate__icon el-icon-star-on"></i>
              <i class="el-rate__icon el-icon-star-on"></i>
              <i class="el-rate__icon el-icon-star-on"></i>
              <span style="font-size:16px;">{{item.stars}}分</span>
            </el-col>
            <el-col :span="7">
              <i>{{item.very_good_remarks}}</i> 条评论
            </el-col>
            <el-col :span="7">
              <i>75</i> 篇游记
            </el-col>
          </el-row>
          <el-row type="flex" class="xsl-huise">
            <i class="iconfont iconlocation" style="color:#666666;"></i>
            {{item.address}}
          </el-row>
        </el-col>
        <el-col :span="6" style="margin-left:10px;">
          <nuxt-link to="#">
            <el-row
              type="flex"
              justify="space-between"
              style="padding: 15px 10px;color:#606266;font-size:16px;border-bottom: 1px solid #ebeef5;"
              class="xsl-tiaoz"
            >
              <el-col :span="24" style="font-size:14px;">{{item.products[0].name}}</el-col>
              <el-col :span="24">
                <i>￥{{item.products[0].price}}</i>起
                <i class="el-icon-arrow-right" style="color:#000;"></i>
              </el-col>
            </el-row>
          </nuxt-link>
          <nuxt-link to="#">
            <el-row
              type="flex"
              justify="space-between"
              style="padding: 15px 10px;color:#606266;font-size:16px;border-bottom: 1px solid #ebeef5;"
              class="xsl-tiaoz"
            >
              <el-col :span="24" style="font-size:14px;">艺龙</el-col>
              <el-col :span="24">
                <i>￥{{item.products[1].price}}</i>起
                <i class="el-icon-arrow-right" style="color:#000;"></i>
              </el-col>
            </el-row>
          </nuxt-link>
          <nuxt-link to="#">
            <el-row
              type="flex"
              justify="space-between"
              style="padding: 15px 10px;color:#606266;font-size:16px;border-bottom: 1px solid #ebeef5;"
              class="xsl-tiaoz"
            >
              <el-col :span="24" style="font-size:14px;">Hotels.com</el-col>
              <el-col :span="24">
                <i>￥{{item.products[2].price}}</i>起
                <i class="el-icon-arrow-right" style="color:#000;"></i>
              </el-col>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总数据
      hotelData: {},
      // res.data里面的酒店数据
      hotelCity: [],
      checked: true,
      value1: [0, 4000]
    };
  },
  methods: {
    // 价格变化
    hanldPrice(val){
      if(val){
        console.log(123)
      }
    },
    // 表格选择
    handleCurrentChange() {}
  },
  mounted() {
    // console.log(this.$store.state.hotel)
    
  }
};
</script>

<style scoped lang="less">
.xsl-form {
  border: 1px solid #ccc;
  font-size: 14px;
  color: #666666;
  padding: 3px 0;
  .xsl-cebian {
    margin-left: 20px;
    padding: 5px 0;
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
    .xsl-jianju {
      margin-bottom: 10px;
    }
  }
}
.hotel-list {
  .xsl-tiaoz {
    width: 235px;
    height: 49px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  font-size: 16px;
  margin-top: 20px;
  .xsl-xiangqing {
    margin-bottom: 10px;
    .xsl-yingwen {
      font-size: 16px;
      color: #999999;
    }
  }
  .xsl-huise {
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
  }
  h4 {
    font-size: 24px;
    font-weight: normal;
  }
  i {
    color: orange;
    margin: 0;
    padding: 0;
  }
  img {
    height: 210px;
    width: 320px;
  }
}
</style>