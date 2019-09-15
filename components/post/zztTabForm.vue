<template>
  <div class="zzt_tab">
    <div class="zzt_tabcontent">
      <div class="zzt_tabcontentone">
        <span>热门城市</span>
        <i>></i>
      </div>
      <div class="zzt_tabcontentone">
        <span>推荐城市</span>
        <i>></i>
      </div>
      <div class="zzt_tabcontentone">
        <span>奔向海岛</span>
        <i>></i>
      </div>
      <div class="zzt_tabcontentone">
        <span>主题推荐</span>
        <i>></i>
      </div>
    </div>
    <div class="zzt_tabbottom">
      <h4>推荐城市</h4>
      <nuxt-link to=""><img src="../../images/pic_sea.jpeg" alt /></nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.zzt_tab {
  .zzt_tabcontent {
    .zzt_tabcontentone {
      width: 260px;

      border: 1px solid #ddd;
      border-right: none;
      border-bottom: none;
      box-shadow: 0 0 1px #f5f5f5;
      z-index: 2;
      span {
        line-height: 40px;
        font-size: 14px;
        padding-left: 20px;
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