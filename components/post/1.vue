





// <template>
//   <!-- tab栏 -->
//   <div class="zzt_tab">
//     <div class="zzt_tabcontent">
//       <div class="zzt_tabcontentone">
//         <span>热门城市</span>
//         <i class="ki el-icon-arrow-right"></i>
//       </div>
//       <div class="zzt_tabcontentone">
//         <span>推荐城市</span>
//         <i class="ki el-icon-arrow-right"></i>
//       </div>
//       <div class="zzt_tabcontentone">
//         <span>奔向海岛</span>
//         <i class="ki el-icon-arrow-right"></i>
//       </div>
//       <div class="zzt_tabcontentone">
//         <span>主题推荐</span>
//         <i class="ki el-icon-arrow-right"></i>
//       </div>
//     </div>

//     <!-- 推荐城市 -->
//     <div class="zzt_tabbottom">
//       <h4>推荐城市</h4>
//       <nuxt-link to>
//         <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
//       </nuxt-link>
//     </div>
//   </div>
// </template>

// <script>
// export default {
//   data() {
//     return {
//       // isCollapse: true,
//       accordion: false
//     };
//   }
//   // methods: {
//   //   handleOpen(key, keyPath) {
//   //     console.log(key, keyPath);
//   //   },
//   //   handleClose(key, keyPath) {
//   //     console.log(key, keyPath);
//   //   }
//   // }
// };
// </script>

// <style lang="less" scoped>
// .zzt_tab {
//   .zzt_tabcontent {
//     .zzt_tabcontentone {
//       width: 260px;
//       border: 1px solid #ddd;
//       border-right: none;
//       border-bottom: none;
//       box-shadow: 0 0 1px #f5f5f5;
//       z-index: 2;
//       span {
        
//         line-height: 40px;
//         font-size: 14px;
//         padding-left: 20px;
//       }
//       .ki{
//         float:right;
//         padding-right: 10px;
//         line-height:40px;
//       }
//     }
//   }
//   .zzt_tabbottom {
//     width: 260px;
//     margin-top: 20px;
//     h4 {
//       font-weight: 400;
//       padding-bottom: 10px;
//       border-bottom: 1px solid #ddd;
//       margin-bottom: 10px;
//     }
//     a {
//       img {
//         width: 100%;
//         display: block;
//       }
//     }
//   }
// }
// </style>


















<template>
  <div>
    <div class="tabs">
      <span class="spanq"
        v-for="(item,index) in ['新闻','体育','军事'] "
        :key="index" 
        @mouseover="selectStyle(index)"
      >{{item}}</span>
    </div>

    <div v-show="current">
      <ul>
        <li>好好好</li>
      </ul>
    </div>

    <div v-show="current">
      <ul>
        <li>哈哈哈</li>
      </ul>
    </div>

    <div v-show="current">
      <ul>
        <li>是是是</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: false
    };
  },
  methods: {
    selectStyle(index) {
      this.current = index;
    }
  }
};
</script>

<style scoped lang="less">
.spanq{
  padding-right: 20px;
}
</style>




