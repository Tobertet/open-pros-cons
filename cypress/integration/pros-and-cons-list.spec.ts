export {};

describe('Pros and cons list', () => {
  beforeEach(() => {
    cy.visit('/open-pros-cons');
    cy.get('[data-testid="create-button"]').click();
    cy.visit('/open-pros-cons/1');
  });

  describe('Header', () => {
    it('shows the name of the pros and cons list', () => {
      cy.get('[data-testid="header-title"]').should(
        'contain',
        'New Pros & Cons list',
      );
    });

    it('shows an alert when the delete button is pressed', () => {
      cy.get('[data-testid="delete-button"]').click();
      cy.get('.delete-alert').should('exist');
    });

    it('deletes the pros and cons list when the alert is accepted', () => {
      cy.get('[data-testid="delete-button"]').click();
      cy.get('.delete-alert').find('.alert-button').last().click();
      cy.url().should('eq', 'http://localhost:3000/open-pros-cons');
      cy.get('[data-testid="pros-cons-table"]')
        .find('[data-testid="pros-cons-list-item"]')
        .should('have.length', 0);
    });

    it('changes the name of the list', () => {
      cy.get('[data-testid="edit-button"]').click();
      cy.get('.edit-alert')
        .find('.edit-input')
        .click()
        .wait(200)
        .clear()
        .type('Caca');
      cy.get('.edit-alert').find('.alert-button').last().click();
      cy.get('[data-testid="header-title"]').should('contain', 'Caca');
    });
  });

  describe('pros list', () => {
    it('shows an empty list of pros on start', () => {
      cy.get('[data-testid="pros-list"]')
        .find('[data-testid="reason"]')
        .should('have.length', 0);
    });

    it('allows to add a pro to the list of pros', () => {
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

    it('shows the count of pros', () => {
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

    it('allows to reorder pros', () => {
      // Could not be tested
    });

    it('allows to change the text of a pro', () => {
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
        .type('{selectall}Edited 1')
        .should('have.value', 'Edited 1');
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);

      cy.get('[data-testid="pros-list"]').should('not.contain', 'Text 1');
      cy.get('[data-testid="pros-list"]').should('contain', 'Edited 1');
    });

    it('allows to delete a pro', () => {
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
  });

  describe('cons list', () => {
    it('shows an empty list of cons on start', () => {
      cy.get('[data-testid="cons-list"]')
        .find('[data-testid="reason"]')
        .should('have.length', 0);
    });

    it('allows to add a con to the list of cons', () => {
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

    it('shows the count of cons', () => {
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

    it('allows to reorder cons', () => {
      // Could not be tested
    });

    it('allows to delete a con', () => {
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

    it('allows to change the text of a con', () => {
      cy.get('[data-testid="cons-list"]')
        .find('[data-testid="add-reason-button"]')
        .click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type('Text 1')
        .should('have.value', 'Text 1');
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);

      cy.get('[data-testid="cons-list"] [data-testid="reason"]').click();

      cy.get('[data-testid="new-reason-form-text-area"]')
        .click()
        .wait(200)
        .type('{selectall}Edited 1')
        .should('have.value', 'Edited 1');
      cy.get('[data-testid="new-reason-form-submit"]').click();
      cy.wait(200);

      cy.get('[data-testid="cons-list"]').should('not.contain', 'Text 1');
      cy.get('[data-testid="cons-list"]').should('contain', 'Edited 1');
    });
  });
});
