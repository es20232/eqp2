/// <reference types="cypress" />
import { faker } from '@faker-js/faker'


describe('Testes front', ()=> {
    beforeEach(() => {
        cy.visit('/')
      })
    it('success page loads', ()=> {
        cy.get('.navbar-brand').should('have.text', 'InstaTwo')
    })

    it('register user', ()=> {
        cy.register(faker.person.firstName(), faker.internet.userName(), faker.internet.email())
    })

    it('login user', ()=>{
        cy.login('Dorian_Rogahn@gmail.com', '12345678')
    })
    
    it('Recovery login', ()=>{
        cy.recovery_password('Rodrigo', '12345678')
    })

})