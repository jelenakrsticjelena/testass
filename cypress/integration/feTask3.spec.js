describe('Filtering and Addition module', () => {
  
    before(() => {
      cy.visit('/')
    });
 
    it('TC-3: Filter and Add to Watchlist option', () => {
      var currency_code_arr=[];
      var currency_row_arr=[];
      var currency_row_wl_arr=[];
      cy.get('button').contains('Filter').should('be.visible').then(()=> {
        cy.get('button').contains('Filter').click().then(()=> {
          cy.get('button').contains('Price').should('be.visible').then(()=>{
            cy.get('button').contains('Price').click().then(()=>{
              cy.get('.tippy-content').should('be.visible').then(()=> {
                cy.get('input[type="text"]').eq(0).should('have.attr', 'placeholder', '$0').then(()=> {
                  cy.get('input[type="text"]').eq(0).type('2000').then(()=> {
                    cy.get('input[type="text"]').eq(1).should('have.attr', 'placeholder', '$99,999').then(()=>{
                      cy.get('input[type="text"]').eq(1).type('8500').then(()=>{
                        cy.get('.Button__StyledButton-sc-1ejyco6-0').contains('Apply').should('be.visible').then(()=> {
                          cy.get('.Button__StyledButton-sc-1ejyco6-0').contains('Apply').click().then(()=> {
                            cy.wait(2000)
                            //addition currencies to wishlist - click on stars
                            for (var i = 1; i <= 5; i++) {
                              cy.get('table > tbody tr:nth-child('+i+') td:first-child').click({ multiple: true })

                              cy.get('table > tbody tr:nth-child('+i+') td:nth-child(3) a div div div p').then(($currency_code)=>{
                                currency_code_arr.push($currency_code.text());
                              })
                              cy.get('table > tbody tr:nth-child('+i+') td:nth-child(8) a p').then(($currency_row)=> {
                                currency_row_arr.push($currency_row[0].innerHTML);
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
      
      cy.wait(5000);  //wait to finish asyn arrays to fill and new currency values to occure
 
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
                cy.wrap($tr).get('td:nth-child(4) a').then(($price)=>{
                  var badvalue=false;
                  for (var i = 0; i < 5; i++) {
                    var value=parseFloat($price[i].innerHTML.replace("$", "").replace(",", ""))
                    if(value<2000 || value>8500){
                      badvalue=true;
                    }
                  }
                  console.log(badvalue?"Bad price range":"All prices are in range");
                  cy.expect(false).to.equal(badvalue);
                })
              }).then(()=> {
                cy.wrap($tr).get('td:nth-child(8) a:nth-child(1) p').then(($volume)=> {
                  for (var i = 0; i < 5; i++) {
                    currency_row_wl_arr.push($volume[i].innerHTML);
                  }                  
                })                
              })
            }).then(()=> {
              currency_row_arr.sort();
              currency_row_wl_arr.sort();

              console.log(JSON.stringify(currency_row_arr))
              console.log(JSON.stringify(currency_row_wl_arr))

              var compare=JSON.stringify(currency_row_arr)==JSON.stringify(currency_row_wl_arr);
              console.log(compare?"eq rows mean no updates in 5s":"diff rows mean upates occurred in 5s")
              cy.expect(compare).to.equal(compare);
            });
          }); 
        })
      })
      
          
    });
});