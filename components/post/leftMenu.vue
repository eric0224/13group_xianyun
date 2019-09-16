<template>
  <el-row type="flex">
    <!-- 左边菜单 -->
    <div class="menu" @mouseleave="currentTab=-1">
      <div
        class="menu-item"
        v-for="(item,index) in menuList"
        :key="index"
        :data-id="index"
        :class="{active:currentTab==index}"
        @mouseenter="addActive($event)"
      >
        <span>
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>

      <div class="recomm-city">
        <h4>推荐城市</h4>
        <nuxt-link to="#"><img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt=""></nuxt-link>
      </div>


      <div class="menu-details" v-if="currentTab!=(-1)">
        <div
          class="menu-details-items"
          v-for="(item1,index) in menuList[currentTab].children"
          :key="index"
        >
          <span>{{index+1}}</span>
          <span>{{item1.city}}</span>
          <span>{{item1.desc}}</span>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      currentTab: -1
    };
  },
  methods: {
    addActive(e) {
      this.currentTab = e.target.dataset.id;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res)
      this.menuList = res.data.data;                                                                                                                                                                                                           
    });
  }
};
</script>

<style lang="less" scoped>
.menu {
  width: 260px;
  margin-bottom:10px; 
  .menu-item {
    border: 1px solid #ddd;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    &:not(:nth-child(4)) {
      border-bottom: none;
    }
    span {
      display: block;
      font-size: 14px;
      i {
        position: absolute;
        right: 20px;
        top: 15px;
      }
    }
  }

  .menu-details {
    z-index: 1;
    border: 1px solid #ddd;
    position: absolute;
    top: 0;
    left: 259px;
    width: 350px;
    padding: 10px 20px;
    background-color: #fff;
    box-sizing: border-box;
    .menu-details-items {
      padding: 2px 0;
      span {
        vertical-align: middle;
        font-size: 14px;
        &:nth-child(1) {
          font-size: 24px;
          color: #ffa500;
          font-style: italic;
        }
        &:nth-child(2) {
          margin: 0 10px;
          color: #ffa500;
          font-weight: 400;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        &:nth-child(3) {
          color: #999;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
  .recomm-city{
    margin-top: 10px;
    h4{
      font-size: 16px;
      padding: 10px 0;
      font-weight: normal;
      border-bottom: 1px solid #ddd;
      margin-bottom:10px; 
    }
    img{
      width: 260px;
    }

  }
}

.active {
  color: #ffa500;
  background-color: #fff;
  border-right: none !important;
}
</style>