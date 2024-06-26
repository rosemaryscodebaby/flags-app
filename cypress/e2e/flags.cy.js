describe('Flags Integration Test', () => {
    it('loads the flags page', () => {
      cy.visit('/');
      cy.contains('Flag').should('be.visible');
    });
  
    it('displays a list of flags after data load', () => {
      cy.visit('/');
      cy.contains('France').should('be.visible');
    });
  
    it('filters flags based on search input', () => {
      cy.visit('/');
      cy.get('input[placeholder="Search by name or population"]').type('Germany');
      cy.contains('France').should('not.exist');
      cy.contains('Germany').should('be.visible');
    });
  });
  