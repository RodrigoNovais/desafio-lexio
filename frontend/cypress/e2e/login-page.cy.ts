/// <reference types="cypress" />

describe('login page', () => {
    it('should not be able to click login button without an email and password', () => {
        cy.visit('/login');

        cy.get('button[type=submit]').should('be.disabled');

        cy.get('input[type=email]').type('a');
        cy.get('button[type=submit]').should('be.disabled');

        cy.get('input[type=password]').type('123456');
        cy.get('button[type=submit]').should('not.be.disabled');

        cy.get('input[type=email]').clear();
        cy.get('button[type=submit]').should('be.disabled');
    });

    it('should toggle password visibility', () => {
        cy.visit('/login');

        cy.get('input').should('have.length', 2);
        cy.get('input').last().should('have.attr', 'type', 'password');

        cy.get('[class*=\'toggle\']').trigger('click');
        cy.get('input').last().should('have.attr', 'type', 'text');

        cy.get('[class*=\'toggle\']').trigger('click');
        cy.get('input').last().should('have.attr', 'type', 'password');
    });

    it('should perform login', () => {
        cy.visit('/login');

        cy.get('input[type=email]').type('lucas.silva@email.com');
        cy.get('input[type=password]').type('123456');

        cy.get('button[type=submit]').click();

        cy.url().should('equal', `${Cypress.config('baseUrl')}/`);
    });

    it('should redirect user to dashboard if logged', () => {
        // Hack to prevent useEffect from breaking the test
        cy.wait(1000);

        cy.login('lucas.silva@email.com', '123456')
            .then(() => {
                cy.visit('/login').then(() => {
                    cy.url().should('equal', `${Cypress.config('baseUrl')}/`);

                    cy.logout();
                });
            });
    });
});
