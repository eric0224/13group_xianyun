// state是存储数据的
// mutations 同步修改state的数据
// action 异步修改satte的数据

//用户管理
export const state = ()=> { 
    return{
        userInfo:{
            user:{}
        }
    } 
       
}

export const mutations = {
    //设置用户信息，mutations下的方法第一个参数固定是state
    // data不是必须的参数，是调用方法时传入的参数
    setUserInfo(state,data){
        state.userInfo = data
    },

    //退出登录，清空用户数据
    clearUserInfo(state){
        state.userInfo = {
            token:'',
            user:''
        }
    }
}

export const actions = {
    //actions函数接受一个context对象，可以通过调用context.commit提交一个mutations
    //事件中会用结构的方式{commit}
    //登录
    login({commit},data){       
        return this.$axios({
            url:'/accounts/login',
            method:'post',
            data:data
        }).then((res)=>{
            const data = res.data
            // 保存数据到本地
         commit('setUserInfo',data)        
        })
    },

    register({commit},data){
        return this.$axios({
            url:'/accounts/register',
            method:'post',
            data:data
        }).then((res)=>{
            const data =res.data
            //登录成功后帮客户自动登录--保存数据到本地存储
            commit('setUserInfo',data)

        })
    }
}