import { createStore } from 'vuex'

const store = createStore({
  state: {
      allShows: [],
      watchList: [],
      showsByGenre: [],
      timeStampLastUpdated: null
  },
  mutations: {
    updateAllShows(state, updatedShowsList) {
      state.allShows = updatedShowsList
      state.timeStampLastUpdated = new Date().getTime()
    },
    addToWatchList(state, show) {
      state.watchList.push(show)
    },
    removeFromWatchList(state, { id }) {
      const updatedWatchList = state.watchList.filter(show => show.id !== id)
      state.watchList = updatedWatchList
    }
    
  },
  actions: {
    updateAllShows(context, updatedShowsList) {
      context.commit('updateAllShows', updatedShowsList)
    },
    addToWatchList(context, show) {
      context.commit('addToWatchList', show)
    },
    removeFromWatchList(context, show) {
      context.commit('removeFromWatchList', show)
    }
  },
  getters: {
    getShowsByGenre: (state) => (genre) => {
      return state.allShows.filter(show => show.genres.includes(genre))
    }
    ,
    getAllGenres(state) {
      const allGenresSet = new Set(
        state.allShows.flatMap(show => show.genres)
      );
      return Array.from(allGenresSet);
    },
    getWatchList(state) {
      return state.watchList
    },
    getUpdateShowsStore: (state) => (timestamp) => {
      const timePassed = (timestamp - state.timeStampLastUpdated) / 60000
      return timePassed > 1
    },
  },
})

export default store