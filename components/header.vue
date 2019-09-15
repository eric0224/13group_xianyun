<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>

      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <div class="login" v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <div class="userInfo" v-else>
        <el-dropdown>
          
          <span class="el-dropdown-link">
            <img :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`" alt="">
            <span>{{$store.state.user.userInfo.user.nickname}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
         
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </header>
</template>

<script>
export default {
  methods:{
    handleLogout(){
      // this.$store.commit('user/clearUserInfo')
      const {commit} = this.$store;
      commit('user/clearUserInfo')
      this.$message.success('退出成功')
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 2px 2px #ddd;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
.logo {
  img {
    display: block;
    width: 156px;
    height: 42px;
    margin-top: 9px;
  }
}
.nav {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }
  //该clas是nuxt会自动去匹配nuxt-link的to的值，如果url和to的值相等会自动去加上下面的值
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}

.login {
  a {
    font-size: 14px;
    display: inline;
    border-bottom: 0;
    &:hover {
      text-decoration: underline;
      color: #409eff;
    }
  }
}

.el-dropdown-link img{
  width: 36px;
  height: 36%;
  vertical-align: middle;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid #fff;
  &:hover{
    border: 2px solid #409eff
  }
}
</style>