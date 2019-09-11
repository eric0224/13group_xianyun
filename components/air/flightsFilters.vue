<template>
  <div class="flights-filters">
      <div>
            <el-row class="filters-head" type="flex" justify="space-between" align="middle">
      <el-col :span="8">
        <span>单程：</span> {{list.info.departCity}} - {{list.info.destCity}} / {{list.info.departDate}}
      </el-col>
      <el-col :span="16">
        <el-row type="flex" justify="space-between" class="filters-options">
          <el-col :span="6">
            <el-select v-model="airport" placeholder="起飞机场" size="mini" @change="chooseAirport">
              <el-option
                v-for="(item,index) in list.options.airport"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="flightTimes" placeholder="起飞时间" size="mini" @change="chooseflightTime">
              <el-option
                v-for="(item,index) in list.options.flightTimes"
                :key="index"
                :label="`${item.from}:00 - ${item.to}:00`"
                :value="`${item.from} , ${item.to}`"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="company" placeholder="航空公司" size="mini" @change="chooseCompany">
              <el-option
                v-for="(item,index) in list.options.company"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="planeType" placeholder="机型" size="mini" @change="choosePlaneSize">
              <el-option
                v-for="(item,index) in planes"
                :key="index"
                :label="item.name"
                :value="item.size"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="filters-cancel">
      <span>筛选：</span>
      <el-button type="primary" round size="mini" @click="cancel" >撤销</el-button>
    </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Object,
            default:{}
        }
    },
  data() {
    return {
        planes:[
           {name:'大',size:'L'} ,
           {name:'中',size:'M'} ,
           {name:'小',size:'S'} 
        ],
        flightTimes: "",
        airport: "",
        company: "",
        planeType:'',
    };
  },
  methods:{
      // 撤销筛选事件
      cancel(){
        this.flightTimes ='';
        this.airport = '';
        this.company = '';
        this.planeType = '';
        this.pageIndex = 1;

        //返回全部数据
        this.$emit('setDataList',this.list.flights)
      },

      //选起飞机场触发的事件
      chooseAirport(value){
        //  console.log(value)
        //过滤数据
         const arr = this.list.flights.filter((v)=>{
          return v.org_airport_name === value
         })
        //  console.log(arr)
         this.$emit('setDataList',arr)
      },

      //选择起飞时间的事件
      chooseflightTime(value){
        // // console.log(value) 
        // const val = value.split(',')
        // // console.log(val)     
        // const arr = this.list.flights.filter((v)=>{
        //   const start = v.dep_time.split(':')          
        //   return val[0] <= +start[0] && start[0] < val[1]
        // })
        // this.$emit('setDataList',arr)
          // console.log(value) 
          //数组的解构赋值  [from,to] = [6,12]
        const [from,to] = value.split(',')
        // console.log(val)     
        const arr = this.list.flights.filter((v)=>{
          const start = +v.dep_time.split(':')[0]          
          return start >= from && start < to
        })
        this.$emit('setDataList',arr)
      },

      // 选择航空公司的事件
      chooseCompany(value){
        const arr = this.list.flights.filter((v)=>{
          return v.airline_name === value
        })
        this.$emit('setDataList',arr)
      },

      //选择机型的事件
      choosePlaneSize(value){
        const arr = this.list.flights.filter((v)=>{
          return v.plane_size === value
        })
        this.$emit('setDataList',arr)
      }
  }
};
</script>

<style lang="less" scoped>
.flights-filters {
  margin-bottom: 20px;
  height: 66px;
  .filters-head {
    height: 28px;
    line-height: 28px;
    margin-bottom: 10px;
    font-size: 14px;

    .filters-options {
      > div {
          padding-left: 5px;
      }
    }
  }

  .filters-cancel{
      font-size: 14px;
  }
}
</style>