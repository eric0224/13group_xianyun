<template>
  <div class="aside">
    <div class="title">
      <h4>相关攻略</h4>
    </div>
    <nuxt-link :to="`?id=${item.id}`" v-for="(item,index) in recomments" :key="index">
      <div class="recommend-item">
        <img :src="`${item.images[0]}`" alt />
        <span>{{item.updated_at | timeFormat}}</span>
        阅读
        <i>{{item.watch}}</i>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import {timeFormat} from '@/plugins/timeFormat'
export default {
  data(){
      return{
          recomments:[]//推荐文章总数据
      }
  },
  filters:{
      timeFormat
  }  ,
  mounted() {
    const { id } = this.$route.query;
    this.$axios({
      url: "/posts/recommend",
      params: { id }
    }).then(res => {
      console.log(res);
      //存储总数据
      this.recomments = res.data.data
    });
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
  height: 300px;

  .title {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ddd;
    h4 {
      font-weight: normal;
    }
  }

  .recommend-item {
    padding: 20px 0;
    font-size: 12px;
    color: #999;
    border-bottom: 1px solid #ddd;
    img {
      width: 100px;
      height: 80px;
    }

    span {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>