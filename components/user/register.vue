<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input style="width:237px" placeholder="验证码" v-model="form.captcha"></el-input>
      <el-button type="button" style="width:108px" @click="handleCaptcha">发送验证码</el-button>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="from-item" prop="chkPassword">
      <el-input v-model="form.chkPassword" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-button type="primary" class="submit" @click="handleRegister">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // rule是当前的规则，目前是空
    // value输入框的内容
    // callback是回调函数，必须调用
    var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.chkPassword !== '') {
            this.$refs.form.validateField('chkPassword');
          }
          callback();
        }
      };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 代表验证通过
        callback();
      }
    };
    return {
      form: {
        username: "", //用户名
        nickname: "",//昵称
        captcha: "",//验证信息
        password: "",//密码
        chkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        chkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleCaptcha() {
      this.$axios({
        method: "post",
        url: "/captchas",
        data: { tel: this.form.username }
      }).then(res => {
        // console.log(res);
        const { code } = res.data;
        this.$alert(code, "验证码", {
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      });
    },
    // 注册
    handleRegister() {
        // 可以使用...+变量名会指向剩余的属性
      const { chkPassword, ...rest } = this.form;
      this.$refs.form.validate(valid => {
        if (valid) {
            //调用注册接口
          // this.$axios({
          //   url: "/accounts/register",
          //   method: "post",
          //   data: rest
          // }).then(res => {
          //   // console.log(res);
          //   // 注册成功后帮客户自动登录
          //   this.$store.commit('user/setUserInfo',res.data)
          //   this.$message.success('注册成功')
          // });

          //用actions来实现
          this.$store.dispatch('user/register',rest)
          .then((res)=>{
            //提示成功
            this.$message.success('注册成功')
            //跳转到首页
            this.$router.push('/')
          })
        }else{
            this.$message.error('请填入必填信息')
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
  .submit {
    width: 100%;
  }
}
</style>