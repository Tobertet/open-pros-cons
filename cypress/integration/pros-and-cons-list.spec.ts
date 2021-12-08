export {};

describe('Pros and cons list', () => {
  it('shows an empty list of pros on start', () => {
    cy.visit('/');

    cy.get('[data-testid="pros-list"]')
      .find('[data-testid="reason"]')
      .should('have.length', 0);
  });

  it('shows an empty list of cons on start', () => {
    cy.visit('/');

    cy.get('[data-testid="cons-list"]')
      .find('[data-testid="reason"]')
      .should('have.length', 0);
  });
});
