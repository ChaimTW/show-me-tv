import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { shows } from './mock_data/mockData'
import BaseShowList from '../Base/BaseShowList.vue'

describe('BaseShowList.vue Test', () => {
  describe('with shows', () => {
    const wrapper = mount(BaseShowList, {
      props: {
        title: "Search Results",
        shows: shows
      }
    })

    it('renders the correct title', () => {
      expect(wrapper.find('.title').text()).toBe('Search Results')
    })

    it('renders the correct number of shows', () => {
      expect(wrapper.findAll('.swiper-slide').length).toBe(shows.length)
    })

    it('renders show titles', () => {
      shows.forEach(show => {
        expect(wrapper.html()).toContain(show.title)
      })
    })
  })

  describe('with no shows', () => {
    const wrapper = mount(BaseShowList, {
      props: {
        title: "Search Results",
        shows: []
      }
    })

    it('renders the correct title', () => {
      expect(wrapper.find('.title').text()).toBe('Search Results')
    })

    it('renders no shows', () => {
      expect(wrapper.findAll('.swiper-slide').length).toBe(0)
    })
  })
})
