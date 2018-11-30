import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//import CryptoJS from 'crypto-js';

//create the store
export const store = new Vuex.Store({
  state: {
    jsonAnimation: {}
  },
  actions: {
    updateCache: ({ commit }, payload) => {
      commit('loadCache', payload)
    },
    updateJsonAnimation: ({ commit }, payload) => {
      commit('updateJsonAnimation', payload)
    },
  },
  mutations: {
    loadCache: (state, payload) => {
      Object.assign(state, payload);
    },
    updateJsonAnimation: (state, payload) => {
      state.jsonAnimation = payload
      persist()
    },
  },
  getters: {
   
  }
});

export const loadCache = () => {
  if (localStorage.getItem('color-state') != undefined) {
    let storageString = localStorage.getItem('color-state');
    let cache = JSON.parse(storageString);
    store.dispatch('updateCache', cache);
  }
};

export const purgeAll = () => {
  let payload = {
    
  }
  localStorage.clear();
  store.dispatch('purgeState', payload);
  window.location.href = "/"
};

function persist() {
  let storeState = JSON.stringify(store.state);
  localStorage.setItem('color-state', storeState);
}
