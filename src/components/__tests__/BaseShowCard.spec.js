import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { shows } from './mock_data/mockData'
import BaseShowCard from '../Base/BaseShowCard.vue'

describe('BaseShowCard.vue Test', () => {
  it('renders the correct values on the screen', () => {

    // render the component
    const wrapper = shallowMount(BaseShowCard, {
      props: {
        show: shows[1],
      }
    })

    it('renders the correct show title', () => {
      expect(wrapper.html()).toContain(shows[1].name)
    })
    
    it('renders show genres', () => {
      shows[1].genres.forEach(genre => {
        expect(wrapper.html()).toContain(genre)
      })
    })

    it('renders the show image', () => {
      expect(wrapper.find('img').exists()).toBe(true)
    })
  })
})