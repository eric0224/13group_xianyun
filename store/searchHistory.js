
//查询历史
export const state = ()=>{
    return{
        searchHistory:[]
    }
}

//mutations同步操作state数据的函数集
//data非必须参数，用作接收传入的数据,state是固定参数，永远在第一位
export const mutations = {
    setSearchHistory(state,data){
        state.searchHistory.push(data)
    }
}

// actions异步修改state的数据的函数集
export const actions = {
    setSearchHistory({commit},data){
        commit('setSearchHistory',data)
    }
}