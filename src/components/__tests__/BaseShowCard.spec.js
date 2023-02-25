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

    // check that the title is rendered
    expect(wrapper.html()).toContain('Person of Interest')
    expect(wrapper.html()).toContain('Action')
    expect(wrapper.html()).toContain('Crime')
    expect(wrapper.html()).toContain('Science-Fiction')
    expect(wrapper.find('img').exists()).toBe(true)
  })
})