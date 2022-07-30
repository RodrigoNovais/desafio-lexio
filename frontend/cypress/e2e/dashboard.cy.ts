describe('dashboard page', () => {
    before(() => {
        cy.login('lucas.silva@email.com', '123456')
            .then(() => cy.visit('/'));
    });

    it('should perform logout', () => {
        cy.get('header > button').trigger('click');

        cy.url().should('equal', `${Cypress.config('baseUrl')}/login`);
    });

    it('should redirect user to login page if not logged', () => {
        // Hack to prevent useEffect from breaking the test
        cy.wait(1000);

        cy.logout();

        cy.visit('/');
        cy.url().should('equal', `${Cypress.config('baseUrl')}/login`);
    });
})
