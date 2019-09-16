export const state = () => {
    return {
        hotelData:{},
        hotelCity:[],
        // 城市名字
        name: '',
    }
}

export const mutations = {
    //修改城市
    setInfoData(state, data) {
        state.name = data
    },
    setTotalPrice(state,data){
        state.hotelCity = data
    },
    sethotelData(state,data){
        state.hotelData = data
    }
}