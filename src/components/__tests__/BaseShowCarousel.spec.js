import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { shows } from './mockData'
import BaseShowCarousel from '../Base/BaseCarousel.vue'

describe('BaseShowCarousel.vue Test', () => {
  it('renders the correct values on the screen', () => {

    // render the component
    const wrapper = mount(BaseShowCarousel, {
      props: {
        title: "Search Results",
        shows: shows
      }
    })

    // check that multiple cards are rendered
    expect(wrapper.html()).toContain('Person of Interest')
    expect(wrapper.html()).toContain('Under the Sun')
    expect(wrapper.findAll('.swiper-slide').at(1).exists()).toBe(true);
  })
})