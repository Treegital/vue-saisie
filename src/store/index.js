import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert';
import { account } from './account';
import { items } from './items';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        alert,
        account,
        items
    }
});

export default store
