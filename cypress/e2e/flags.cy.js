describe('Flags Integration Test', () => {
  // Clear selected countries if present
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', 'Favorites').should('exist').should('be.visible');
    cy.contains('button', 'Favorites').click();
    cy.contains('button', 'Remove All').click();
    cy.contains('No Flags Saved')
    cy.contains('button', 'Close').click();
  });

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

  it('adds Switzerland, Germany and Puerto Rico to favorites and checks the modal', () => {
    // Select Countries
    cy.visit('/');
    searchAndClickOnCountry('Switzerland');
    searchAndClickOnCountry('Germany');
    searchAndClickOnCountry('Puerto Rico');

    // Open the My Favorites modal 
    cy.contains('button', 'Favorites').should('exist').should('be.visible');
    cy.contains('button', 'Favorites').click();

    // Check for saved countries and close the modal
    cy.contains('My Favorites').should('be.visible');
    cy.contains('Switzerland').should('be.visible');
    cy.contains('Puerto Rico').should('be.visible');

    // Remove the saved countries
    cy.contains('button', 'Remove All').click();
    cy.contains('No Flags Saved').should('be.visible');
    cy.contains('button', 'Close').click();
  });

  it('checks that flags details modal can display detailed information', () => {
    cy.contains('Germany').click();
    cy.contains('Germany Details:').should('be.visible');
    cy.contains('Official name (en): Federal Republic of Germany').should('be.visible');
    cy.contains('Native name: Bundesrepublik Deutschland (Deutschland)').should('be.visible');
    cy.contains('Capital: Berlin').should('be.visible');
  });

  function searchAndClickOnCountry(country) {
    cy.get('input[placeholder="Search by keyword e.g. `Euro`"]').type(country);
    cy.contains(country).click();
    cy.reload();
  }
});





