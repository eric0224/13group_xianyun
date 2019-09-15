<template>
  <div class="contanier">
    <el-row type="flex" justify="space-between">
      <!--内容正文区域  -->
      <div class="content">
        <!-- 筛选区 -->

        <FlightsFilters :list="cacheFlightsData" @setDataList="resetDataList" />

        <!-- 航班信息头部 -->
        <FlightListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsListItem v-for="(item,index) in flightsList" :key="index" :data="item" />
          <!-- 分页结构 -->
          <el-pagination
            v-show="flightsData.flights.length !== 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <!-- //无数据的时候显示 -->

          <div class="show-none" v-show="flightsData.flights.length === 0">暂无航班信息!</div>
        </div>
      </div>

      <!-- 侧边栏组件 -->

      <FlightsAside />
    </el-row>
  </div>
</template>

<script>
import FlightListHead from "@/components/air/flightsListHead";
import FlightsListItem from "@/components/air/flightsListItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      //机票信息的总数据
      flightsData: {
        info: {},
        options: {},
        flights: {}
      },
      //新建一个属性来缓存总数据，以免筛选后丢失总数据,这个数据只修改一次
      cacheFlightsData: {
        info: {},
        options: {},
        flights: {}
      },
      //创建一个中间数组来存储要每页显示的数据
      flightsList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    //获取数据 
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res);
        //赋值给总数据
        this.flightsData = res.data;
        //缓存一份总数据,这个列表不会被修改，而this.flightsData会被修改
        this.cacheFlightsData = { ...res.data };
        // 分页的总条数
        this.total = this.flightsData.flights.length;
        // 存储第一页的值
        this.flightsList = this.flightsData.flights.slice(0, this.pageSize);
      });
    },

    //每页显示条数变化触发的事件
    handleSizeChange(val) {
      console.log(val); //val表示当前每页的条数
      //每一次设置完显示条数后，都会回到第一页，所以直接设置第一页的显示数就行了
      this.flightsList = this.flightsData.flights.slice(0, val);
    },

    //当前页码变化触发的事件
    handleCurrentChange(val) {
      // console.log(val)//val表示当前页数
      this.pageIndex = val;
      this.flightsList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    },

    //该方法传递个子组件用于修改flightsList的数据
    resetDataList(arr) {
      console.log(arr);
      //跳到第一页
      this.pageIndex = 1;
      //修改总数据
      this.flightsData.flights = arr;
      //修改分割数组
      this.flightsList = this.flightsData.flights.slice(0, this.pageSize);
      //修改总条数
      this.total = arr.length;
    }
  },
  watch: {
    $route() {
      // console.log(this.$route.query);
      this.getData()
    }
  },
  mounted() {
    // console.log(this.$route)
    this.getData()
  },
  components: {
    FlightListHead,
    FlightsListItem,
    FlightsFilters,
    FlightsAside
  }
};
</script>

<style lang="less" scoped>
.contanier {
  width: 1000px;
  margin: 20px auto;

  .content {
    width: 745px;
  }
}

.show-none {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #aaa;
}
</style>