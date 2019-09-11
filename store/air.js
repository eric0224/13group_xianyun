export const state = ()=>{
    return{
        //机票的信息对象
        infoData:{
            seat_infos:{}
        },
        //机票总价
        totalPrice:0
    }
}

export const mutations = {
    //修改机票信息
    setInfoData(state,data){
        state.infoData = data
    },
    //修改机票总价
    setTotalPrice(state,price){
        state.totalPrice = price
    }
}