import { auth_service } from '@/services/auth';
import router from '@/router';


const token = localStorage.getItem('token');
const state = token
      ? { status: { logged_in: true, token: token } }
      : { status: {} };


const actions = {
    login({ dispatch, commit }, creds) {
        commit('loginRequest');
        auth_service.login(creds)
            .then(
                auth => {
                    commit('loginSuccess', auth.token);
                    commit('assignationSuccessful', auth.current);
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
    loginRequest(state) {
        state.status = { logging_in: true };
    },
    loginSuccess(state, token) {
        state.status = { logged_in: true, token: token };
    },
    loginFailure(state) {
        state.status = {};
    },
    logout(state) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
