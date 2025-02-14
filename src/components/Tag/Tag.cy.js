/* eslint-disable */
import SdsTag from './Tag.vue'
// import { mount } from 'cypress/vue'

describe('Tag - Accessibility', () => {
  it('is accessible', () => {
    cy.mount(SdsTag)
    cy.injectAxe()
    cy.checkAccessibility()
  })
})
