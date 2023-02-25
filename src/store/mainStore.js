import { createStore } from 'vuex'

const store = createStore({
  state: {
      allShows: [],
      watchList: [],
      showsByGenre: []
  },
  mutations: {
    updateAllShows(state, updatedShowsList) {
      state.allShows = updatedShowsList
    },
    addToWatchList(state, show) {
      state.watchList.push(show)
    },
    removeFromWatchList(state, showToRemove) {
      const updatedWatchList = state.watchList.filter(show => {
        return show.id != parseInt(showToRemove.id)
      })
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
      let showsByGenre = state.allShows.filter(show => {
        return show.genres.includes(genre)
      })
      return showsByGenre;
    },
    getAllGenres(state) {
      let allGenres = []
      for(const show of state.allShows){
        for(const genre of show.genres){
          if(!allGenres.includes(genre)){
            allGenres.push(genre)
          }
        }
      }
      return allGenres
    },
    getWatchList(state) {
      return state.watchList
    }
  },
})

export default store