<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="menber-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="users[index].username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成年人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="users[index].id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 删除乘机人 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <el-button class="add-member" type="primary" @click="handleAddMenber">添加乘机人</el-button>
    </div>
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index" >
          <el-checkbox
            :label="`${item.type} ：￥${item.price}/份x1 最高赔付${item.compensation}`"
            border          
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
        <!-- <div class="insurance-item">
          <el-checkbox label="航空意外险 ：￥30/份x1 最高赔付260万" border></el-checkbox>
        </div>-->
      </div>
    </div>
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleCaptchas">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 触发计算属性的机构 -->
    <span v-show="false">{{totalPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户列表
      users: [
        {
          username: "",
          id: ""
        }
      ],
      //保险id数组
      insurances: [],
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      invoice: false, //是否需要发票
      seat_xid: "", //座位ID
      air: "", //航班ID
      captcha: "", //验证码
      //机票数据
      infoData: {
        seat_infos: {}
      }
    };
  },
  methods: {
    //添加users的成员--添加乘机人
    handleAddMenber() {
      //给users添加一个成员
      this.users = [
        ...this.users,
        {
          username: "",
          id: ""
        }
      ];
    },

    //删除乘机人
    handleDeleteUser(index) {
      // 删除数组中某个元素使用splice，截取数组中的某一项时候使用slice
      this.users.splice(index, 1);
    },

    //选择保险
    handleChange(id) {
      //判断数组中是否已经包含该id，包含了应该删除
      const index = this.insurances.indexOf(id);

      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
    },

    //发送验证码
    handleCaptchas() {
      this.$axios({
        method: "post",
        url: "/captchas",
        data: { tel: this.contactPhone }
      }).then(res => {
        const { code } = res.data;
        this.$alert(code, "验证码");
      });
    },

    //提交表单
    handleSubmit() {
      const { seat_xid, id } = this.$route.query;
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid,
        air: id
      };

      //判断乘机人
      if (!this.users[0].username || !this.users[0].id) {
        this.$message.error("乘机人不能为空");
        return;
      }

      // 判断联系人
      if (!this.contactName) {
        this.$message.error("联系人不能为空");
        return;
      }

      //判断手机号
      if (!this.contactPhone) {
        this.$message.error("联系手机不能为空");
        return;
      }

      // 判断验证码
      //   if (!this.captcha) {
      //     this.$message.error("验证码不能为空");
      //     return;
      //   }
      // console.log(data)
      this.$axios({
        url: "/airorders",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data
      }).then(res => {
        console.log(res);
        const { id } = res.data.data;
        this.$message.success("正在生成支付链接");
        //跳转路由
        this.$router.push({
          path: "/air/pay",
          query: { id }
        });
      });
    }
  },
  computed: {
    totalPrice() {
      let price = 0;
      //机票单价，取作座位信息的第一个价格
      price += this.infoData.seat_infos.org_settle_price;
      //加机建燃油费
      price += this.infoData.airport_tax_audlet;
      //加保险费用
      price += 30 * this.insurances.length;
      //应付总价
      price *= this.users.length;
      //   把数据保存到store
      this.$store.commit("air/setTotalPrice", price);

      return price;
    }
  },
  mounted() {
    const idObj = this.$route.query;
    this.$axios({
      url: `/airs/${idObj.id}`,
      params: { seat_xid: idObj.seat_xid }
    }).then(res => {
      //   console.log(res);
      //赋值给订单总数据
      this.infoData = res.data;

      //   调用store的方法保存数据
      this.$store.commit("air/setInfoData", res.data);
    });
  }
};
</script>

<style lang="less" scoped>
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>