<template>
    <div class="function-bar">
        <el-row type="flex" justify="center">
            <div class="comment">
                <span class="el-icon-edit"></span>
                <i >评论(88)</i>
            </div>
            <div class="star">
                <span class="el-icon-star-off"></span>
                <i>收藏</i>
            </div>
            <div class="share">
                <span class="el-icon-share"></span>
                <i>分享</i>
            </div>
            <div class="like">
                <span class="el-icon-success"></span>
                <i>点赞(88)</i>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.function-bar{
    width: 100%;
    padding: 15px 10px;
    margin: 20px 0;

    .comment,.star,.share,.like{
       width: 55px;
       height: 55px;      
       font-size: 14px;
       color:#bbb;
       text-align: center; 
       margin: 0 5px;
       span{
           font-size: 38px;
           display: block;
           color:#ffa500; 
        }

    }

}
</style>