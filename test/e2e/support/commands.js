// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

// Print cypress-axe violations to the terminal
function printAccessibilityViolations(violations) {
  cy.task(
      'table',
      violations.map(({ id, impact, description, nodes }) => ({
          impact,
          description: `${description} (${id})`,
          nodes: JSON.stringify(nodes),
      })),
  );
}

// Configure a11y options, specifically, what standards you want to test
const A11YOptions = {
  runOnly: {
      type: 'tag',
      values: ['wcag21a', 'wcag21aa', 'section508']
  }
}

// Add the command to the list of available Cypress commands
Cypress.Commands.add(
  'checkAccessibility',
  {
      prevSubject: 'optional',
  },
  (subject, { skipFailures = false } = {}) => {
      cy.checkA11y(subject, A11YOptions, printAccessibilityViolations, skipFailures);
  },
);

