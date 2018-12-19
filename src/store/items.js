import { items_service } from '@/services/items';
import router from '@/router';


const item = localStorage.getItem('item');
const state = item
      ? { current_item: { filename: item } }
      : { current_item: {} };

const actions = {
    assign({ dispatch, commit }, filename) {
        items_service.assign(filename)
            .then(
                item => {
                    commit('assignationSuccessful', item.assigned);
                    router.push('/input');
                },
                error => {
                    commit('assignationFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    deassign({ dispatch, commit }) {
        console.log('deassign !')
        items_service.deassign()
            .then(
                () => {
                    commit('deassignationSuccessful');
                    router.push('/assign');
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
};

const mutations = {
    assignationSuccessful(state, item) {
        state.current_item = { filename: item };
    },
    assignationFailure(state) {
        state.current_item = {};
    },
    deassignationSuccessful(state) {
        state.current_item = {};
    }
};

export const items = {
    namespaced: true,
    state,
    actions,
    mutations
};
