export {}

describe('Public transport map', () => {
    it('shows bike lanes', () => {

      const sushiPlace = 'Sushi Place';
      const pizzaPlace = 'Pizza Place';

      cy.intercept({method: 'GET', url: 'xxx'}, {}).as('getBikeLanes')
  
      cy.wait('@getBikeLanes')


      cy.visit('/');
      cy.contains(sushiPlace);
      cy.contains(pizzaPlace);
    });
  });