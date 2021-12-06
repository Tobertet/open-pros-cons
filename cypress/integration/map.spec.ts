export {};

describe('Pros and cons list', () => {
  it('shows empty pros list on start', () => {
    cy.visit('/');

    cy.get('[data-test-id="pros-list"]').should('be.empty');
  });

  it('allows to add a pro', () => {
    cy.visit('/');

    const proText = 'Test pro';

    cy.get('[data-test-id="pros-list-add-button"]').click();
    cy.get('[data-test-id="pros-list-add-input"]').type(proText);
    cy.get('[data-test-id="pros-list-add-submit"]').click();

    cy.get('[data-test-id="pros-list"]').contains(proText);
  });
});
