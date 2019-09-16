// 这个文件封装了文章详情页的所有数据
export const state = ()=>{
   return{
       postDetail:{},
       userName:'',
       userInfo:{
            nickname:'',
            id:0
       }
   }
}

export const mutations = {
    setPostDetail(state,data){
        state.postDetail = data
    },
    setFollowId(state,data){     
        state.userName = data
    },
    setUserInfo(state,data){
        state.userInfo = data
    },
    clearUserInfo(state,val1,val2){
        state.userInfo.nickname = val1
        state.userInfo.id = val2
    }
}