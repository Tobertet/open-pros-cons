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

  it('allows to add a pro to the list of pros', () => {
    cy.visit('/');

    const proText = 'Test pro';

    cy.get('[data-testid="pros-list"]')
      .find('[data-testid="add-reason-button"]')
      .click();

    cy.get('[data-testid="new-reason-form-text-area"]')
      .click()
      .wait(200)
      .type(proText)
      .should('have.value', proText);
    cy.get('[data-testid="new-reason-form-submit"]').click();

    cy.get('[data-testid="pros-list"]').should('contain', proText);
  });

  it('allows to add a con to the list of cons', () => {
    cy.visit('/');

    const conText = 'Test con';

    cy.get('[data-testid="cons-list"]')
      .find('[data-testid="add-reason-button"]')
      .click();

    cy.get('[data-testid="new-reason-form-text-area"]')
      .click()
      .wait(200)
      .type(conText)
      .should('have.value', conText);
    cy.get('[data-testid="new-reason-form-submit"]').click();

    cy.get('[data-testid="cons-list"]').should('contain', conText);
  });

  it('shows the count of pros', () => {
    cy.visit('/');

    ['Text 1', 'Text 2', 'Text 3'].forEach((item, index) => {
      cy.get('[data-testid="pros-list"]')
        .find('[data-testid="add-reason-button"]')
        .click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type(item)
        .should('have.value', item);
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);

      cy.get('[data-testid="pros-list"]')
        .find('[data-testid="reasons-count"]')
        .should('contain', index + 1);
    });
  });

  it('shows the count of cons', () => {
    cy.visit('/');

    ['Text 1', 'Text 2', 'Text 3'].forEach((item, index) => {
      cy.get('[data-testid="cons-list"]')
        .find('[data-testid="add-reason-button"]')
        .click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type(item)
        .should('have.value', item);
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);

      cy.get('[data-testid="cons-list"]')
        .find('[data-testid="reasons-count"]')
        .should('contain', index + 1);
    });
  });

  it('allows to reorder pros', () => {
    // Could not be tested
  });

  it('allows to reorder cons', () => {
    // Could not be tested
  });

  it('allows to delete a pro', () => {
    cy.visit('/');

    ['Text 1', 'Text 2'].forEach((item, index) => {
      cy.get('[data-testid="pros-list"]')
        .find('[data-testid="add-reason-button"]')
        .click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type(item)
        .should('have.value', item);
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);
    });

    cy.get('[data-testid="pros-list"] [data-testid="delete-button"]')
      .first()
      .click();

    cy.get('[data-testid="pros-list"]').should('not.contain', 'Text 1');
    cy.should('contain', 'Text 2');
  });

  it('allows to delete a con', () => {
    cy.visit('/');

    ['Text 1', 'Text 2'].forEach((item, index) => {
      cy.get('[data-testid="cons-list"]')
        .find('[data-testid="add-reason-button"]')
        .click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type(item)
        .should('have.value', item);
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);
    });

    cy.get('[data-testid="cons-list"] [data-testid="delete-button"]')
      .first()
      .click();

    cy.get('[data-testid="cons-list"]').should('not.contain', 'Text 1');
    cy.should('contain', 'Text 2');
  });

  it.only('allows to change the text of a pro', () => {
    cy.visit('/');

    cy.get('[data-testid="pros-list"]')
      .find('[data-testid="add-reason-button"]')
      .click();

    cy.get('[data-testid="new-reason-form-text-area"]')
      .click()
      .wait(200)
      .type('Text 1')
      .should('have.value', 'Text 1');
    cy.get('[data-testid="new-reason-form-submit"]').click();
    cy.wait(200);

    cy.get('[data-testid="pros-list"] [data-testid="reason"]').click();

    cy.get('[data-testid="new-reason-form-text-area"]')
      .click()
      .wait(200)
      .type('Edited 1')
      .should('have.value', 'Edited 1');
    cy.get('[data-testid="new-reason-form-submit"]').click();
    cy.wait(200);

    cy.should('not.contain', 'Text 1');
    cy.should('contain', 'Edited 1');
  });
});
