<template>
  <div class="global">
    <h2>发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦！</p>
    <el-input v-model="input" placeholder="请输入标题"></el-input>
    <el-row class="demo-autocomplete" >
  <el-col :span="5" >
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请搜索游玩城市"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <div class="sub-title">例如：广州</div>
  </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style sonped lang="less">
.global {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: space-between;
  .el-row--flex {
    display: flex;
  }
  h2 {
      font-size: 24px;
      font-weight: 400;
      margin: 10px 0;
  }
  p{
      font-size: 12px;
      color: #999;
       margin: 10px 0;

  }
  .el-input{
      width: 80%;
      margin: 20px 0;
  }
  .sub-title{
      font-size: 16px;
      color: #999;
  }
  div {
    display: block;
  }
}
</style>