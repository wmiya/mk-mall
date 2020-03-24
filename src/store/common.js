export default {
    state: {
        nickName: '',
        cartCount: 0
    },
    mutations: {
        updateNickName(state, val) {
            state.nickName = val
        },
        updateCartCount(state, val) {
            state.cartCount += val
        },
        initCartCount(state, val) {
            state.cartCount = val
        }
    }
}