<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span v-for="(item,index) in ['登录','注册']" :key="index"
          :class="{active:current===index}" @click="current = index">
              {{item}}
          </span>
          <!-- <span>注册</span> -->
        </el-row>

        <!-- 登录功能组件 -->
        <loginForm v-if="current === 0"></loginForm>
        <!-- 注册功能组件 -->
        <register v-if="current === 1"></register>
      </div>
    </el-row>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm'
import register from '@/components/user/register'
export default {
    data(){
        return{
            current:1,
        }
    },
    components:{
        loginForm,register
    }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  height: 700px;
  background: url("http://157.122.54.189:9095/assets/images/th03.jfif") center 0;
  
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>