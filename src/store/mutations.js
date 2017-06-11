// 同步事件

let mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    hideArrow(state, playload) {
        state.showArrow = playload;
    },
    setUserinfo(state, val) {
        state.userInfo = val;
    }
}

export default mutations