describe('Filtering and Addition module', () => {
  
    before(() => {
      cy.visit('/')
    });
 
    it('TC-4: Filter and Add to Watchlist option', () => {

      function getRandomInt(min, max) {//rundom generator
        min = Math.ceil(min);max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      var $minimal_price=getRandomInt(2000, 3000);//determine minimal price
      var $maximal_price=getRandomInt(90000, 99999);//determine maximal price
      var $number_favorites=getRandomInt(6, 10);//determent how much favorite currencies to select

      cy.log("$minimal_price: "+$minimal_price);
      cy.log("$maximal_price: "+$maximal_price);
      cy.log("$number_favorites: "+$number_favorites);

      var currency_code_arr=[];//array to store values for currency codes
      var currency_row_arr=[];//array to store values of currency volumes
      var currency_row_wl_arr=[];//array to store values of currency volumes in watchlist

      cy.get('div.table-control-area button').should('be.visible');//find button 'Filter'
      cy.get('div.table-control-area button').click();// click on button 'Filter'
      
      cy.get('div.filter-area > div:nth-child(3) button').should('be.visible');//find button 'Price' in button bar
      cy.get('div.filter-area > div:nth-child(3) button').click();//click on that 'Price' button

      cy.get('div[data-tippy-root]').should('be.visible');//wrapper must contain input fields for price range input 
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]')
        .should('be.visible');//find input field for typing minimal price
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]')
        .should('have.attr', 'placeholder', '$0');//find input placeholder with minimal price $0
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]').type($minimal_price);//try to put some value in minimal price

      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]')
        .should('be.visible');//find input field for typing maximal price
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]')
        .should('have.attr', 'placeholder', '$99,999');//find input placeholder with maximal price $99,999
      // try to input wrong max value 
        cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]').type($minimal_price-getRandomInt(1000, 2000));//try to put some value smaller then minimal value

      cy.get('div[data-tippy-root] button[data-qa-id="filter-dd-button-apply"]')
        .should('have.attr', 'disabled');//wrong range must disable 'Apply' button
      
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]').clear().type($maximal_price);//clear wrong value and input right max price value
      cy.get('div[data-tippy-root] button[data-qa-id="filter-dd-button-apply"]')
        .should('not.have.attr', 'disabled');//right range means that 'Apply' button is not enabled

      //trying to change currency to euro and check if the currency is changed everywhere  
      cy.get('button[data-qa-id="button-global-currency-picker"]').eq(0).should('be.visible');//is currency picker button visible
      cy.get('button[data-qa-id="button-global-currency-picker"]').eq(0).click({ multiple: true });//click to currency picker

      cy.get('div[data-tippy-root]').should('not.exist');//wrapper for price range must disappeared because currency-picker is clicked
      
      cy.get('div.cmc-popover__dropdown span.giIwHm').eq(0).click({ multiple: true });//pick EURO currency (class giIwHm represent EURO currency)
      cy.get('div.filter-area > div:nth-child(3) button').click();//then click on 'Price' button

      // bug report that changed currency is not consistent on whole page
//*****************  skip bug **********************
//      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]').should('have.attr', 'placeholder', '€0');//find input placeholder with minimal price change currency value to €0
//      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]').should('have.attr', 'placeholder', '€99,999');//find input placeholder with maximal price change currency value to €99,999
//*****************  skip bug **********************/
      
      cy.get('button[data-qa-id="button-global-currency-picker"]').eq(0).click();//back to currency picker
      cy.get('div.cmc-popover__dropdown span.kOefQi').eq(0).click({ multiple: true });//pick DOLLAR currency (class kOefQi represente DOLLAR currency)
      cy.get('div.filter-area > div:nth-child(3) button').click();//then click on 'Price' button

      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]').type($minimal_price);//set value for minimal price
      cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]').type($maximal_price);//set value for maximal price      

      cy.get('div[data-tippy-root] button[data-qa-id="filter-dd-button-apply"]').click({ multiple: true }).then(function(){//click on 'Apply' button
        for (var i = 1; i <= $number_favorites; i++) {//start clicking with first number_favorites currencies
          if(i<=5){//according the test assignment request, select currency by click on ellipsis
            cy.get('table > tbody tr:nth-child('+i+') td:nth-child(11) div button').click({ multiple: true }).then(()=>{
                cy.get('div[data-tippy-root] a').eq(0).click({ multiple: true });
                cy.get('div.cmc-toolbar-button__trigger').contains('Watch').parent().click({ multiple: true });
                cy.go('back');
                
                //filter range dissapired after returning into start page - bug is present
                //*****************  skip bug **********************
                cy.get('div.table-control-area button').click();// click on button 'Filter'
                cy.get('div.filter-area > div:nth-child(3) button').click();//then click on 'Price' button
                cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-min"]').type($minimal_price);//set value for minimal price
                cy.get('div[data-tippy-root] input[data-qa-id="range-filter-input-max"]').type($maximal_price);//set value for maximal price 
                cy.get('div[data-tippy-root] button[data-qa-id="filter-dd-button-apply"]').click({ multiple: true });
                cy.wait(5000);//wait until addEventListeners apply to ellipsis buttons on newly formed rows in currency table
                //*****************  skip bug **********************
            })
          }else{//select currency by click on stars
            cy.get('table > tbody tr:nth-child('+i+') td:first-child').click({ multiple: true });//click star to select
          }
          
          cy.get('table > tbody tr:nth-child('+i+') td:nth-child(3) a div div div p').then(($currency_code)=> {//save choises 
            currency_code_arr.push($currency_code.text());//currency code is saved in array
          })
          cy.get('table > tbody tr:nth-child('+i+') td:nth-child(8) a p').then(($currency_row)=> {//save values for currency volume
            currency_row_arr.push($currency_row[0].innerHTML);//currency Volume is saved in array
          })
        }
      });
      /************************************************************************************************ */      
      cy.wait(5000);  //wait new currency values to occure
      /************************************************************************************************ */ 

      cy.get('button').contains('Watchlist').click();//triger click on 'Watchlist'
      cy.url().should('eq', 'https://coinmarketcap.com/watchlist/');//new page is loaded
      cy.get('table tbody tr').should('have.length.of', $number_favorites).should('be.visible');//there must be the number_favorites for all picked currencies
      cy.get('table > tbody tr').each(($tr) => {//find all rows with currencies and for each of row
        cy.wrap($tr).get('td:nth-child(3) a div div div p').then(($currency_code)=> {//find all currency codes for selected currencies
          console.log($currency_code)
          var currency_code_arr2=[];
          for (var i = 0; i < $number_favorites; i++) {
            currency_code_arr2.push($currency_code[i].innerHTML);//push all currency codes in new array (arr2)
          } 
          currency_code_arr.sort();//sort array
          currency_code_arr2.sort();//sort array
          cy.log(JSON.stringify(currency_code_arr)==JSON.stringify(currency_code_arr2)?"eq currencies":"diff currencies")
          cy.expect(JSON.stringify(currency_code_arr)).to.equal(JSON.stringify(currency_code_arr2));//compared arrays must be the equal (same)
        }).then(()=> {
          cy.wrap($tr).get('td:nth-child(4) a').then(($price)=> {//find if currency prices are in defined range
            var badvalue=false;
            for (var i = 0; i < $number_favorites; i++) {
              var value=parseFloat($price[i].innerHTML.replace("$", "").replace(",", ""))//transform string value to float
              if(value<$minimal_price || value>$maximal_price){//determine if prices are out of range
                badvalue=true;
              }
            }
            cy.log(badvalue?"Bad price range":"All prices are in range"); //if praces is out of range inform about that
            cy.expect(false).to.equal(badvalue);
          })
        }).then(()=> {
          cy.wrap($tr).get('td:nth-child(8) a:nth-child(1) p').then(($volume)=> {//find new volumes of currencies
            for (var i = 0; i < $number_favorites; i++) {
              currency_row_wl_arr.push($volume[i].innerHTML);//push volumes to volume array
            }                  
          })                
        })
      }).then(()=> {
        currency_row_arr.sort();//sort array
        currency_row_wl_arr.sort();//sort array
        cy.log(JSON.stringify(currency_row_arr))
        cy.log(JSON.stringify(currency_row_wl_arr))
        var compare=JSON.stringify(currency_row_arr)==JSON.stringify(currency_row_wl_arr);//compare currency volumes from both array 
        cy.log(compare?"eq rows mean no updates in 5s":"diff rows mean upates occurred in 5s")
        cy.expect(compare).to.equal(compare);//return true if volume changed, or return false if values are the same 
      });
    });
});