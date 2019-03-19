import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    therapists: [],
    therapeuten: []
    //        therapist: []
  },
  actions: {
    getTherapists({ commit }) {
      axios
        //                .get('https://api.myjson.com/bins/18kuna')
        .get('https://api.myjson.com/bins/1h9rjo')
        .then(r => r.data)
        .then(therapists => {
          commit('SET_THERAPISTS', therapists)
          //                    commit('setData', therapists)
        })
    }
  },
  mutations: {
    SET_THERAPISTS(state, therapists) {
      state.therapists = therapists
    },
    setTherapeuten(state, therapeuten) {
      this.state.therapeuten = therapeuten
    }
  }
  //    getters: {
  //        therapists(store){
  //            return store.therapists
  //        }
  //    }
})