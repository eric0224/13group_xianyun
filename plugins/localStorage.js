
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    // console.log(obj)
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'store',//可以使任意字符,设置本地存储中的键的名字
            paths: [] //同一个键，有多个值的时候，选出想要的值的路径
        })(store)
    })
}