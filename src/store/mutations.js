// 同步事件

let mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    hideArrow(state, playload) {
        state.showArrow = playload;
    }
}

export default mutations