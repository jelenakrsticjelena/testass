describe('Top100 module', () => {
  
    before(() => {
      cy.visit('/')
    });

    it('TC-1: Drop down choose option', () => {

      cy.get('.NavbarItem__NavbarItemTitle-sc-1a0iugo-0').contains('Cryptocurrencies').should('be.visible')
      cy.get('.NavbarItem__NavbarItemTitle-sc-1a0iugo-0').contains('Cryptocurrencies').click()
      cy.get('h6').contains('Cryptocurrencies').should('be.visible')
      cy.get('h6').contains('Cryptocurrencies').click()
      cy.get('table tbody tr').should('have.length.of', 100)
      cy.get('table > tbody tr:last-child td:nth-child(2)').then(($td) => {
          expect($td).to.contain('100');
        });  
    })

    })