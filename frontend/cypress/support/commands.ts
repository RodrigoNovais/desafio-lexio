/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'http://192.168.15.12:8000/login',
        body: {
            email,
            password,
        }
    })
    .then(({ body }) => {
        window.localStorage.setItem('@auth:token', body['token'])
        window.localStorage.setItem('@auth:user', JSON.stringify({ name: body['name'] }))
    })
});

Cypress.Commands.add('logout', () => { cy.clearLocalStorage(); });

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to perform api login.
             * @example cy.login('fake@email.com', 'fake-password')
             */
            login(email: string, password: string): Chainable<void>

            /**
             * Custom command to perform logout.
             */
            logout(): Chainable<void>
        }
    }
}

export {};
