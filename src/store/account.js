import { auth_service } from '@/services/auth';
import router from '@/router';


const token = localStorage.getItem('token');
const state = token
    ? { status: { loggedIn: true }, token }
    : { status: {}, token: null };


const actions = {
    login({ dispatch, commit }, creds) {
        commit('loginRequest', creds.username);
        auth_service.login(creds)
            .then(
                token => {
                    commit('loginSuccess', token);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        auth_service.logout();
        commit('logout');
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
