export const state = () => {
    return {
        postData: {},
    }
}

export const mutations = {
    setPostData(state, data) {
        state.postData = data
    }
}