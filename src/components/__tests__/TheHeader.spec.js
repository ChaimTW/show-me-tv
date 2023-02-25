import { describe, it, vi, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { useRoute } from 'vue-router'
import TheHeader from '../UI/TheHeader.vue'

vi.mock('vue-router')

describe('TheHeader.vue Test', () => {
  it('triggers all logic when on /watchlist route', async () => {

    useRoute.mockReturnValue({
      path: "/watchlist",
    })

    // render the component
    const wrapper = shallowMount(TheHeader, {})

    await wrapper.find('.nav-active').trigger('click')
    expect(wrapper.findAll('.nav-active').length).toBe(1)
  })

  it('triggers all logic when on /search route', async () => {

    useRoute.mockReturnValue({
      path: "/search",
    })

    // render the component
    const wrapper = shallowMount(TheHeader, {})

    await wrapper.find('.nav-active').trigger('click')
    expect(wrapper.findAll('.nav-active').length).toBe(1)
  })

  it('triggers all logic when on /home route', async () => {

    useRoute.mockReturnValue({
      path: "/home",
    })

    // render the component
    const wrapper = shallowMount(TheHeader, {})

    await wrapper.find('.nav-active').trigger('click')
    expect(wrapper.findAll('.nav-active').length).toBe(1)
  })
})