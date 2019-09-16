// 这个文件封装了文章详情页的所有数据
export const state = ()=>{
   return{
       postDetail:{},
       userName:''
   }
}

export const mutations = {
    setPostDetail(state,data){
        state.postDetail = data
    },
    setFollowId(state,data){     
        state.userName = data
    }
}