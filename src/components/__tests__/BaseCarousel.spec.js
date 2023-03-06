import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { shows } from './mock_data/mockData'
import BaseShowCarousel from '../Base/BaseCarousel.vue'

describe('BaseShowCarousel.vue Test', () => {
  const wrapper = mount(BaseShowCarousel, {
    props: {
      title: "Search Results",
      shows: shows
    }
  })

  it('renders show titles', () => {
    shows.forEach(show => {
      expect(wrapper.html()).toContain(show.name)
    })
  })

  it('renders a swiper slide component', () => {
    expect(wrapper.findAll('.swiper-slide').at(1).exists()).toBe(true);
  })
})