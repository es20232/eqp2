Cypress.Commands.add('register', (nome, username, email) => {
    cy.get(':nth-child(1) > a > .btn').click()
    cy.get(':nth-child(2) > .form-control').type(nome)
    cy.get(':nth-child(3) > .form-control').type(username)
    cy.get(':nth-child(4) > .form-control').type(email)
    cy.get(':nth-child(5) > .form-control').type('12345678')
    cy.get(':nth-child(6) > .form-control').type('12345678')
    cy.get('.btn').click()
})

Cypress.Commands.add('login', (email, password) => {
    cy.get(':nth-child(2) > .form-control').type(email)
    cy.get(':nth-child(3) > .form-control').type(password)
    cy.get(':nth-child(2) > a > .btn').click()
})

Cypress.Commands.add('recovery_password', (username, new_password) =>{
    cy.get('div > .btn').click()
    cy.get('.form-control').type(username)
    cy.get('.btn').click()
    cy.get(':nth-child(2) > .form-control').type(username)
    cy.get(':nth-child(3) > .form-control').type(new_password)
    cy.get(':nth-child(4) > .form-control').type('1')
    cy.get('.btn').click()
})

Cypress.Commands.add('edit_profile', (username, password)=>{
    cy.get(':nth-child(2) > .form-control').type(username)
    cy.get(':nth-child(3) > .form-control').type(password)
    cy.get(':nth-child(2) > a > .btn').click()
    cy.wait(3000)
    cy.get(':nth-child(2) > a > .btn').click()
    cy.wait(3000)
    cy.get(':nth-child(6) > .form-control').type('Oi meu nome é goku')
    cy.get('.btn').click()
})