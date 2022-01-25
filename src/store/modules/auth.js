const state = {
    token: localStorage.getItem(process.env.VUE_APP_TOKEN_LS_KEY),
    user: localStorage.getItem(process.env.VUE_APP_USER_LS_KEY),
};

const getters = {
    getUser(state) {
        console.log('state.getUser', state.user);
        return !!state.user ? JSON.parse(state.user) : {};
    },
    getToken(state) {
        return state.token;
    },
    isAuthed(state) {
        return !!state.user ? true : false;
    },
};

const actions = {
    storeUser({ commit }, user) {
        commit('storeUser', user);
    },
    storeToken({ commit }, token) {
        commit('storeToken', token);
    },
};

const mutations = {
    storeUser(state, value) {
        console.log('state.storeUser', value);
        if (!value) {
            state.user = null;
            localStorage.removeItem(process.env.VUE_APP_USER_LS_KEY);
            return;
        }
        value = JSON.stringify(value);
        state.user = value;
        localStorage.setItem(process.env.VUE_APP_USER_LS_KEY, value);
        return;
    },
    storeToken(state, value) {
        console.log('state.storeToken', value);
        if (!value) {
            state.token = null;
            localStorage.removeItem(process.env.VUE_APP_TOKEN_LS_KEY);
            return;
        }

        state.token = value;
        localStorage.setItem(process.env.VUE_APP_TOKEN_LS_KEY, value);
        return;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
