<template>
    <div class="comment">
        <!-- 发表评论区 -->
        <div class="add-comment">
            <h4>评论</h4>

            <!-- 回复标签 -->
            <el-tag class="response">回复</el-tag>
            <!-- 编辑评论 -->
            <el-input class="textarea" type="textarea" :rows="2" v-model="comments" placeholder="说点什么吧..." resize="none"></el-input>
            <!-- 上传图片和提交按钮 -->
            <el-row type="flex" justify="space-between" class="upload">
                <div >
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    class="upload-file"                    
                    >
                    <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="submit">
                  <el-button type="primary" size="small">提交</el-button>
                </div>
            </el-row>
        </div>

        <!-- 评论展示区 -->

    </div>
</template>

<script>
export default {
   data(){
       return{
           comments:''
       }
   },
   methods:{
       //预览图片
       handlePictureCardPreview(){

       },

       //移除图片的效果
       handleRemove(){}
   } 
}
</script>

<style lang="less" scoped>
.add-comment{
    margin-bottom: 20px;

    h4{
        margin-bottom: 20px;
        font-weight: normal;
        font-size: 18px;
    }

    .response{
        margin-bottom: 10px ;
    }

    .upload{
        margin: 10px 0;
        
       
    }
}
</style>