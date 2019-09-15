
<template>
  <div class="tab">
    <!-- tab栏 -->
    <!-- <div
      class="zzt_tabcontentone"
      v-for="(item, index) in tabData"
      :key="index"
      @mouseover="handleClick(index)"
      @mouseout="current=false"
      :class="{ active: current === index}"
    >
      <span>{{item}}</span>
      <i class="ki el-icon-arrow-right"></i>
    </div>-->
    <!-- hover显示的内容 -->
    <!-- <div class="hoverNav" >
      <div v-show="current === 0" class="hoverNavs" @mouseover="current=true">
        <ul>
          <li>
            <i>1</i> 北京
            <span></span>
            <router-link to="#">世界著名古都和现代化国际城市</router-link>
          </li>
          <li>
            <i>2</i> 广州
            <span>粤港澳大湾区、泛珠江三角洲经济区</span>
          </li>
          <li>
            <i>3</i> 上海
            <span>长江入海口，东隔东中国海</span>
          </li>
          <li>
            <i>4</i> 成都
            <span>国家历史文化名城</span>
          </li>
          <li>
            <i>5</i> 西安
            <span>中国国际形象最佳城市之一</span>
          </li>
        </ul>
      </div>

      <div v-show="current === 1" class="hoverNavs">
        <ul>
          <li>
            <i>1</i> 青岛
            <span>滨海度假旅游城市</span>
          </li>
          <li>
            <i>2</i> 杭州
            <span>西湖十景</span>
          </li>
          <li>
            <i>3</i> 深圳
            <span>世界影响力的创新创意之都</span>
          </li>
          <li>
            <i>4</i> 广州
            <span>粤港澳大湾区、泛珠江三角洲经济区</span>
          </li>
          <li>
            <i>5</i> 成都
            <span>国家历史文化名城</span>
          </li>
        </ul>
      </div>

      <div v-show="current === 2" class="hoverNavs">
        <ul>
          <li>
            <i>1</i> 秦皇岛
            <span>驰名中外的旅游休闲胜地</span>
          </li>
          <li>
            <i>2</i> 青岛
            <span>滨海度假旅游城市</span>
          </li>
          <li>
            <i>3</i> 珠海
            <span>浪漫之城，百岛之市婚</span>
          </li>
          <li>
            <i>4</i> 深圳
            <span>世界影响力的创新创意之都</span>
          </li>
          <li>
            <i>5</i> 海口
            <span>海滨自然旖旎风光</span>
          </li>
        </ul>
      </div>
      <div v-show="current === 3" class="hoverNavs">
        <ul>
          <li>
            <i>1</i> 海口
            <span>海滨自然旖旎风光</span>
          </li>
          <li>
            <i>2</i> 广州
            <span>粤港澳大湾区、泛珠江三角洲经济区</span>
          </li>
          <li>
            <i>3</i> 上海
            <span>长江入海口，东隔东中国海</span>
          </li>
          <li>
            <i>4</i> 珠海
            <span>浪漫之城，百岛之市</span>
          </li>
          <li>
            <i>5</i> 西安
            <span>中国国际形象最佳城市之一</span>
          </li>
        </ul>
      </div>
    </div>-->
    <!-- tab栏 -->
    <div
      class="zzt_tabcontentone"
      v-for="(item, index) in tabsData"
      :key="index"
      :class="{ active: currents === index}"
      @mouseover="handleHover(index)"
      @mouseout="currents=false"
    >
      <span>{{item.type}}</span>
      <i class="ki el-icon-arrow-right"></i>
      <!-- 显示栏 -->
      <div class="hoverNav">
        <el-row
          type="flex"
          justify="space-between"
          v-for="(item2,index2) in (tabsData[currents]&&tabsData[currents].children)"
          :key="index2"
          class="hoverNavs"
          v-show="isShow"
        >
          <el-col :span="2">{{index2+1}}</el-col>
          <el-col :span="4">{{item2.city}}</el-col>
          <el-col :span="18">{{item2.desc}}</el-col>
        </el-row>
      </div>
    </div>

    <!-- 推荐城市 -->
    <div class="zzt_tabbottom">
      <h4>推荐城市</h4>
      <nuxt-link to>
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 记录当前的状态
      current: 0,
      currents: -1,
      tabsData: [],
      isShow: false
    };
  },

  methods: {
    handleHover(index) {
      // 修改current
      this.current = index;
      this.currents = index;
      this.isShow = true;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.tabsData = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.tab {
  position: relative;
  .zzt_tabcontentone {
    width: 260px;
    box-sizing: border-box;
    z-index: 2;
    border: 1px solid #ddd;
    &:not(:nth-child(4)) {
      border-bottom: none;
    }
    &:hover {
      border-right: none;
      background: #fff;
    }
    span {
      line-height: 40px;
      font-size: 14px;
      padding-left: 20px;
    }
    .ki {
      float: right;
      padding-right: 10px;
      line-height: 40px;
    }
    .hoverNav {
      position: absolute;
      top: 0px;
      left: 259px;
      background: #fff;
      width: 310px;
      z-index: 1;
       border: 1px solid #ddd;
      .hoverNavs {
        line-height: 40px;
        font-size: 14px;
        
      }
    }
  }

  // .hoverNav {
  //   position: absolute;
  //   top: 0px;
  //   left: 259px;
  //   background: #fff;
  //   width: 300px;
  //   z-index: 1;

  //   .hoverNavs {
  //     border: 1px solid #dddddd;
  //     ul {
  //       li {
  //         padding-left: 10px;
  //         i {
  //           font-style: italic;
  //           font-size: 20px;
  //           color: #ffa500;
  //         }
  //         line-height: 40px;
  //         font-size: 14px;
  //         span {
  //           color: #999;
  //         }
  //       }
  //     }
  //   }
  // }

  .zzt_tabbottom {
    width: 260px;
    margin-top: 20px;
    h4 {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    a {
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>