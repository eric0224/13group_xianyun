<template>
    <div style="padding:50px;margin-bottom:20px">
        <div class="tabs">
            <span v-for="(item,index) in ['新闻','体育','娱乐']" 
            :key="index"
            @click="handleClick(index)"
            :class="{active:current===index}">
                {{item}}
            </span>
        </div>

        <div v-show="current===0">
            <ul>
                <li>暖心公交司机</li>
                <li>暖心公交司机</li>
                <li>暖心公交司机</li>
            </ul>
        </div>
        <div v-show="current===1">
            <ul>
                <li>中国男篮</li>
                <li>中国男篮</li>
                <li>中国男篮</li>
            </ul>
        </div>
        <div v-show="current===2">
            <ul>
                <li>吴亦凡被耍</li>
                <li>吴亦凡被耍</li>
                <li>吴亦凡被耍</li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            //记录当前状态
            current:0
        }
    },
    methods:{
        handleClick(index){
            this.current = index
        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        margin-bottom: 10px;
        span{
            cursor:pointer
        }
    }

    .active{
        color: red
    }

    ul{
        outline: none;
        list-style: none;
    }
</style>