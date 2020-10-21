describe('Top100 module', () => {
  
    before(() => {
      cy.visit('/?trtrytr')//start page with fake arguments
    });

    it('TC-1: Drop down choose option', () => {      
      cy.get('div.cmc-header-desktop > div:nth-child(2) > div:nth-child(2) ul li:nth-child(1) a').should('be.visible')
      cy.get('div.cmc-header-desktop > div:nth-child(2) > div:nth-child(2) ul li:nth-child(1) a').click()
      cy.get('div.cmc-body-wrapper div.grid div.cmc-homepage div.table-control-page-sizer div').contains('100')
      cy.get('table tbody tr').should('have.length.of', 100)
      cy.get('table > tbody tr:last-child td:nth-child(2)').then(($td) => {
          expect($td).to.contain('100');
      });  
    })

    })