// 这个文件封装了文章详情页的所有数据
export const state = ()=>{
   return{
       postDetail:{}
   }
}

export const mutations = {
    setPostDetail(state,data){
        state.postDetail = data
    }
}