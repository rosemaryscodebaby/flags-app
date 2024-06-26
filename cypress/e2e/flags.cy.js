describe('Flags Integration Test', () => {
  it('loads the flags page', () => {
    cy.visit('/');
    cy.contains('Flag').should('be.visible');
  });

  it('displays a list of flags after data load', () => {
    cy.visit('/');
    cy.contains('France').should('be.visible');
  });

  it('filters flags based on country search input', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search by keyword e.g. `Euro`"]').type('Germany');
    cy.contains('France').should('not.exist');
    cy.contains('Germany').should('be.visible');
  });

  it('filters flags based on currency search input', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search by keyword e.g. `Euro`"]').type('Swiss Franc');
    cy.contains('France').should('not.exist');
    cy.contains('Switzerland').should('be.visible');
  });

  it('clicks on a row and checks that the row details are displayed', () => {
      cy.visit('/');
      cy.contains('Germany').should('be.visible');
      cy.contains('Germany').click();
      cy.contains('Official name (en):').should('be.visible');
      // Check that the country details appear
      cy.contains('Germany Details:').should('be.visible');
      cy.contains('Official name (en):').should('be.visible');
      cy.contains('Capital:').should('be.visible');
  });
});
