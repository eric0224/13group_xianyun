<template>
    <div class="post">
          <!-- 文章题目 -->
          <div class="post-title">
            这是一个大大的标题
          </div>
          <!-- 状态条 -->
          <div class="status-bar">
            攻略 : <span> 2019-05-22 12:59</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            阅读 : <span>1032</span>
          </div>
          <!-- 文章内容 -->
          <div class="post-content">
            这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
            这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
            这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
            这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文
            这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文           
          </div>
        </div>
</template>
 

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.post{
  margin-bottom: 20px;
  .post-title{
    width: 100%;
    padding: 15px 0;
    font-size: 28px;
    font-weight: 800;
    border-bottom: 1px solid #ddd;
  }

  .status-bar{
    padding: 20px 20px;
    text-align: right;
    font-size: 16px;
    color: #ccc;
  }

  .post-content{
    color:#626262;
    font-size: 16px;
  }
}
</style>