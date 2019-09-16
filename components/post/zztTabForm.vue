
<template>
  <div class="tab">
    <!-- tab栏 -->
    <div class="tabs" @mouseleave="currents=false">
      <div
        class="zzt_tabcontentone"
        v-for="(item, index) in tabsData"
        :key="index"
        :class="{active: current === index}"
        @mouseenter="handleHover(index)"
      >
        <!-- @mouseout="currents=false" -->
        <span>{{item.type}}</span>
        <i class="ki el-icon-arrow-right"></i>
      </div>
      <!-- 显示栏 -->
      <div class="hoverNav">
        <div
          type="flex"
          justify="space-between"
          v-for="(item2,index2) in (tabsData[currents]&&tabsData[currents].children)"
          :key="index2"
          class="hoverNavs"
          v-show="isShow"
        >
          <i>{{index2+1}}</i>&nbsp;&nbsp;
          <nuxt-link to class="zzt-xiahuax">{{item2.city}}</nuxt-link>&nbsp;&nbsp;&nbsp;
          <nuxt-link to style="color:#b39999;">{{item2.desc}}</nuxt-link>
        </div>
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
      // console.log(res);
      this.tabsData = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.tab {
  .tabs {
    position: relative;
    .zzt_tabcontentone {
      position: relative;
      width: 260px;
      box-sizing: border-box;
      z-index: 3;
      border: 1px solid #ddd;
      cursor: pointer;
      &:not(:nth-child(4)) {
        border-bottom: none;
      }
      &:hover {
        border-right: none;
        background: #fff;
      }
      .active {
        color: #ffa500;
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
    }
    .hoverNav {
      position: absolute;
      top: 0px;
      left: 259px;
      background: #fff;
      z-index: 2;
      border: 1px solid #ddd;
      .hoverNavs {
        width: 310px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 10px;
        .zzt-xiahuax{
          color: orange;
          &:hover{
            border-bottom: 1px solid orange;
          }
        }
        i {
          font-style: italic;
          font-size: 18px;
          color: #ffa500;
        }
        .nuxt-link-active {
          text-decoration: 1px;
        }
      }
    }
  }

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