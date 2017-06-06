// 同步事件

let mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    }
}

export default mutations