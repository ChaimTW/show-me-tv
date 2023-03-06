import { createStore } from 'vuex'

const store = createStore({
  state: {
      shows: [],
      watchList: [],
      showsByGenre: [],
      lastUpdated: null
  },
  mutations: {
    setShows(state, updatedShowsList) {
      state.shows = updatedShowsList
      state.lastUpdated = new Date().getTime()
    },
    addShowToWatchList(state, show) {
      state.watchList.push(show)
    },
    removeShowFromWatchList(state, { id }) {
      const updatedWatchList = state.watchList.filter(show => show.id !== id)
      state.watchList = updatedWatchList
    }
    
  },
  actions: {
    updateShows(context, updatedShowsList) {
      context.commit('setShows', updatedShowsList)
    },
    addShowToWatchList(context, show) {
      context.commit('addShowToWatchList', show)
    },
    removeShowFromWatchList(context, show) {
      context.commit('removeShowFromWatchList', show)
    }
  },
  getters: {
    getShowsByGenre: (state) => (genre) => {
      return state.shows.filter(show => show.genres.includes(genre))
    },
    getAllGenres(state) {
      const allGenresSet = new Set(state.shows.flatMap(show => show.genres))
      return Array.from(allGenresSet)
    },
    getWatchList(state) {
      return state.watchList
    },
    shouldUpdateShows: (state) => (timestamp) => {
      const timePassed = (timestamp - state.lastUpdated) / 60000
      return timePassed > 1
    },
  },
})

export default store
