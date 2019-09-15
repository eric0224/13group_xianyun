<template>
  <div class="comment">
    <!-- 发表评论区 -->
    <div class="add-comment">
      <h4 id="maodian">评论</h4>

      <el-form :model="form">
        <!-- 回复标签 -->
        <el-tag class="response" v-if="userInfo.nickname"
        closable  @close="handleClose" 
        >回复:@{{userInfo.nickname}} </el-tag>
        <!-- 编辑评论 -->
        <el-input
          class="textarea"
          type="textarea"
          :rows="2"
          v-model="form.content"
          placeholder="说点什么吧..."
          resize="none"
        ></el-input>
        <!-- 上传图片和提交按钮 -->
        <el-row type="flex" justify="space-between" class="upload">
          <div>
            <el-upload
              action="http://127.0.0.1:1337/upload"
              list-type="picture-card"
              ref="imgUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success ="handleSuccess"
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
  props:{
    userInfo:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      form: {
        content:"",
        pics:[],
        post:0
      }
    };
  },
  methods: {
    //移除标签的事件
    handleClose(){
      //清空store中的nickname
     this.userInfo.nickname = ''
    },

    //文件上传成功的事件
    handleSuccess(response,fileList){
      console.log(response)
      // console.log(fileList)
      this.form.pics.push(response[0])
    
    },
   

    //文件状态改变事件
    handleChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);
    },

    //预览图片
    handlePictureCardPreview() {},

    //移除图片的效果
    handleRemove(file) {
      console.log(file)
     
      this.form.pics.forEach((v,i)=>{
        if(v.name === file.name ){
          this.form.pics.splice(i,1)
        }
      })
    },
    
    // //清空图片列表
    // clearFiles(){},

    //提交事件
    handleSubmit() {
        // console.log(this.form.pics)
        const {id} = this.$route.query
        this.form.post = id
        if(this.userInfo.id){
          this.form.follow = this.userInfo.id
        }
      this.$axios({
          url:'/comments',
          method:'POST',
          headers:{             
              Authorization:`Bearer ${this.$store.state.user.userInfo.token}`
          },
          data:this.form  
      }).then((res)=>{
          // console.log(res)
          this.$message.success('评论成功')
          this.$emit('updateComments')
          this.form.content = ''
          this.form.pics = []
          this.$refs.imgUpload.clearFiles()
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