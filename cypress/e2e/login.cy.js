/* eslint-disable */

describe('Login spec', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');
    });
  
    it('should display login page correctly', () => {
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button').contains('Login').should('be.visible');
    });
  
    it('should display alert when email and password are wrong', () => {
      cy.get('input[placeholder="Email"]').type('wrongemail@test.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button').contains('Login').click();
  
      cy.on('window:alert', (str) => {
        expect(str).to.not.be.null;
      });
    });
  
    it('should display homepage when email and password are correct', () => {
      cy.get('input[placeholder="Email"]').type('salman@example.com');
      cy.get('input[type="password"]').type('rahasia123');
      cy.get('button').contains('Login').click();
  
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });