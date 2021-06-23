import { createStore } from 'vuex'

export default createStore({
  state: {
    title: "Book an appointment",
    user: null,
  },
  getters: {
    user: state => state.user,
    title: state => state.title
  },
  mutations: {
    user(state, user) {
      state.user = user;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    }
  }
})
