import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        activeCommunityToken: '50236e05-bc9a-4657-93d5-50cf58cba4d8',
    },
    getters: {
        communityToken(store) {
            return store.activeCommunityToken;
        }
    }
})

export default {
    store,
};