describe('Filtering and Addition module', () => {
  
    before(() => {
      cy.visit('/')
    });
 
    it('TC-2: Filter and Add to Watchlist option', () => {
      var currency_code_arr=[];
      cy.get('button').contains('Filter').should('be.visible').then(()=>{
        cy.get('button').contains('Filter').click().then(()=>{
          cy.get('button').contains('Price').should('be.visible').then(()=>{
            cy.get('button').contains('Price').click().then(()=>{
              cy.get('.tippy-content').should('be.visible').then(()=>{
                cy.get('input[type="text"]').eq(0).should('have.attr', 'placeholder', '$0').then(()=>{
                  cy.get('input[type="text"]').eq(0).type('2000').then(()=>{
                    cy.get('input[type="text"]').eq(1).should('have.attr', 'placeholder', '$99,999').then(()=> {
                      cy.get('input[type="text"]').eq(1).type('99999').then(()=> {
                        cy.get('.Button__StyledButton-sc-1ejyco6-0').contains('Apply').should('be.visible').then(()=> {
                          cy.get('.Button__StyledButton-sc-1ejyco6-0').contains('Apply').click().then(()=> {
                            for (var i = 1; i <= 5; i++) {
                              cy.get('table > tbody tr:nth-child('+i+') td:first-child').click({ multiple: true });
                              cy.get('table > tbody tr:nth-child('+i+') td:nth-child(3) a div div div p').then(($currency_code) => {
                                currency_code_arr.push($currency_code.text());
                              })
                            }
                          })
                        })
                      })
                    })
                  })
                }) 
              })
            })
          })
        })
      })
      
      cy.wait(1000);  //wait to finish asyn array NIZ to fill
 
      cy.get('button').contains('Watchlist').click().then(()=> {
        cy.url().should('eq', 'https://coinmarketcap.com/watchlist/').then(()=> {
          cy.get('table tbody tr').should('have.length.of', 5).should('be.visible').then(()=> {
            cy.get('table > tbody tr').each(($tr) => {
              cy.wrap($tr).get('td:nth-child(3) a div div div p').then(($currency_code)=> {
                var currency_code_arr2=[];
                for (var i = 0; i < 5; i++) {
                  currency_code_arr2.push($currency_code[i].innerHTML);
                } 
                currency_code_arr.sort();
                currency_code_arr2.sort();
                console.log(JSON.stringify(currency_code_arr)==JSON.stringify(currency_code_arr2)?"eq currencies":"diff currencies")
                cy.expect(JSON.stringify(currency_code_arr)).to.equal(JSON.stringify(currency_code_arr2));
              }).then(()=> {
                cy.wrap($tr).get('td:nth-child(4) a').then(($price)=> {
                  var badvalue=false;
                  for (var i = 0; i < 5; i++) {
                    var value=parseFloat($price[i].innerHTML.replace("$", "").replace(",", ""))
                    if(value<2000 || value>99999){
                      badvalue=true;
                    }
                  }
                  console.log(badvalue?"Bad price range":"All prices are in range");
                  cy.expect(false).to.equal(badvalue);
                })
              })
            });
          }); 
        })
      })
      
          
    });
});