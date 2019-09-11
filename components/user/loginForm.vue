<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item prop="username" class="form-item">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input placeholder="密码" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      //二次验证
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$axios({
          //     url:'/accounts/login',
          //     method:'post',
          //     data:this.form
          // }).then((res)=>{

          //    this.$store.commit('user/setUserInfo',res.data)
          //   //  跳到首页
          //   this.$router.push('/')
          // })
          this.$store.dispatch("user/login", this.form).then(res => {
            //提示成功
            this.$message.success("登录成功");
            //  跳到首页
            this.$router.back();
          });
        } else {
          console.log("验证失败");
        }
      });
    }
  },
  mounted() {}
};
</script>


<style lang="less" scoped>
.form {
  padding: 25px;

  .form-item {
    margin-bottom: 20px;
  }

  .form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
  }

  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>