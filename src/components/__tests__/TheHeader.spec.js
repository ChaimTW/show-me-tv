import { describe, it, vi, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { useRoute } from 'vue-router'
import TheHeader from '../UI/TheHeader.vue'

vi.mock('vue-router')

describe('TheHeader.vue Test', () => {
  const testRoute = async (path) => {
    useRoute.mockReturnValue({ path })

    const wrapper = shallowMount(TheHeader, {})
    await wrapper.find('.nav-active').trigger('click')

    expect(wrapper.findAll('.nav-active').length).toBe(1)
  }

  describe('when on /watchlist route', () => {
    it('triggers all logic', async () => {
      await testRoute('/watchlist')
    })
  })

  describe('when on /search route', () => {
    it('triggers all logic', async () => {
      await testRoute('/search')
    })
  })

  describe('when on /home route', () => {
    it('triggers all logic', async () => {
      await testRoute('/home')
    })
  })
})