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
    },
    muteSound(state, val) {
        state.mute = val;
    },
    closeMusicByUser(state, val) {
        state.closeMusic = val;
    }
}

export default mutations