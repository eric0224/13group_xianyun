<template>
    <el-row class="flightsTitle">
        <el-col :span="5">航空信息</el-col>
        <el-col :span="14">
            <el-col :span="12">起飞时间</el-col>
            <el-col :span="12">达到时间</el-col>
        </el-col>
        <el-col :span="5">价格</el-col>
    </el-row>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.flightsTitle{
    padding: 0 12px;
    height: 38px;
    line-height: 38px;
    margin-bottom: 10px;
    background: #f6f6f6;
    border: 1px solid #ddd;
    font-size: 12px;

    > div{
        text-align: center;
    }
}
</style>