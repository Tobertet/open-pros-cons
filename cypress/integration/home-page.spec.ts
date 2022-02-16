export {};

describe('Home page', () => {
  describe('when entering for the first time', () => {
    beforeEach(() => {
      cy.visit('/open-pros-cons');
    });

    it('shows an example when entering for the first time', () => {
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .should('have.length', 1)
        .should('contain', 'Example: Trip to Valencia');
    });
  });

  describe('when entering for the secont time', () => {
    beforeEach(() => {
      cy.visit('/open-pros-cons');
      window.localStorage.setItem('CapacitorStorage.prosAndConsLists', '[]');
    });

    it('shows an empty table of lists of pros and cons', () => {
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .should('have.length', 0);
    });

    it('creates a new list of pros and cons when pressing the + button', () => {
      cy.get('[data-testid="create-button"]').click();
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .should('have.length', 1);
    });

    it('stores the created lists after refreshing the browser', () => {
      cy.get('[data-testid="create-button"]').click();
      cy.reload();
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .should('have.length', 1);
    });

    it('navigates to /open-pros-cons/:id when an item is clicked', () => {
      cy.get('[data-testid="create-button"]').click();
      cy.get('[data-testid="create-button"]').click();
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .last()
        .click();
      cy.url().should('eq', 'http://localhost:3000/open-pros-cons/2');
    });
  });
});
