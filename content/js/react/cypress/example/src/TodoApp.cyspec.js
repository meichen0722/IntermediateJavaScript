import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { TodoApp } from './TodoApp'

describe('TodoApp', () => {
  it('should add a todo', () => {
    mount(<TodoApp />)
    cy.contains('One')
    cy.contains('Two')
    cy.get('input').type('Three')
    cy.contains('Add').click()
    cy.contains('One').parent().contains('x').click()
    cy.contains('One').should('not.exist')

    // cy.contains('One')
    // cy.contains('Two')
    // cy.get('input').type('Three')
    // cy.contains('Add').click()
    // cy.contains('Three')
    // cy.contains('One').parent().contains('x').click()
    // cy.contains('One').should('not.exist')
  })
})
