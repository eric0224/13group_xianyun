<template>
  <div class="comment">
    <!-- 发表评论区 -->
    <div class="add-comment">
      <h4>评论</h4>

      <el-form :model="form">
        <!-- 回复标签 -->
        <el-tag class="response">回复</el-tag>
        <!-- 编辑评论 -->
        <el-input
          class="textarea"
          type="textarea"
          :rows="2"
          v-model="form.comments"
          placeholder="说点什么吧..."
          resize="none"
        ></el-input>
        <!-- 上传图片和提交按钮 -->
        <el-row type="flex" justify="space-between" class="upload">
          <div>
            <el-upload
              action="http://127.0.0.1:1337/uploads"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              class="upload-file"
              name="files"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <div class="submit">
            <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
          </div>
        </el-row>
      </el-form>
    </div>

    <!-- 评论展示区 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        comments: "",
        pic:[],
        post:0
      }
    };
  },
  methods: {
    //文件状态改变事件
    handleChange(file, fileList) {
      console.log(file);
      console.log(fileList);
    },

    //预览图片
    handlePictureCardPreview() {},

    //移除图片的效果
    handleRemove() {},

    //提交事件
    handleSubmit() {
        const {id} = this.$route.query
        this.post = id
      this.$axios({
          url:'/comments',
          method:'post',
          headers:{
              ContentType:'application/json',
              Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
          },
          data:this.form  
      }).then((res)=>{
          console.log(res)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.add-comment {
  margin-bottom: 20px;

  h4 {
    margin-bottom: 20px;
    font-weight: normal;
    font-size: 18px;
  }

  .response {
    margin-bottom: 10px;
  }

  .upload {
    margin: 10px 0;

    // .upload-file{
    //     width: 100px;
    //     height: 100px;
    // }
  }
}
</style>