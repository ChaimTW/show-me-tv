import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex';
import WatchlistPage from '../pages/TheWatchListPage.vue';
import BaseShowList from '../Base/BaseShowList.vue'
import { shows } from './mock_data/mockData'

describe('WatchlistPage.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore({
      state: {
        watchList: shows
      },
      getters: {
        getWatchList: state => state.watchList
      }
    });
    wrapper = mount(WatchlistPage, {
      global: {
        plugins: [store]
      }
    });
  });

  it('renders "My Watchlist" title when watchlist is not empty', () => {
    expect(wrapper.find('h2').text()).toBe('My Watchlist');
  });

  it('renders "Watchlist empty..." title when watchlist is empty', () => {
    store.state.watchList = [];
    wrapper = mount(WatchlistPage, {
      global: {
        plugins: [store]
      }
    });
    expect(wrapper.find('h2').text()).toBe('Watchlist empty...');
  });

  it('renders BaseShowList with correct shows prop', () => {
    expect(wrapper.findComponent(BaseShowList).props('shows')).toEqual(store.state.watchList);
  });

  it('renders BaseShowList with correct title prop', () => {
    expect(wrapper.findComponent(BaseShowList).props('title')).toBe('My Watchlist');
  });
});
