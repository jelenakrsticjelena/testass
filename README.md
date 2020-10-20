"# coinMarketCap" 
# testass

# Front-end testing of coinmarketcap.com  
  
For testing of https://coinmarketcap.com/ Cypress testing tool was used which is based on Javascript programming language.  
Task has two main tests, based on the required specification.  
  
  
# Tests  
  
Task has two main tests and one which is an addition for the second test (feTask3.spec.js), based on the required specification.  
The tool which is used for writing codes is VisualStudioCode.  
Steps of Cypress framework of Installation are given in https://docs.cypress.io/guides/getting-started/installing-cypress.html#Installing.  
After installation of Cypress, tests can be run.  
All files which are mandatory for running test are packed in one folder for TestAsssignment which is named "TESTASS". The next files are packed in them:  
  
1. Cypress  
2. [ ] fixtures  
3. [ ] integration  
- feTask1.spec.js  
- feTask2.spec.js  
- feTask3.spec.js  
4. [ ] plugs  
5. [ ] support  
6. node_modules  
7. .gitignore  
8. cypress.json  
9. package-lock.json  
10. package.json  
11. README.md  
Pre-condition of all test is going to https://coinmarketcap.com/ site. This site is set as baseUrl for all test (see: cypress.json file)  
  
## FE Test 1  
  
The first task for this test is feTask1.spec.js  
The aim of this test is to verify is there, in 'All Cryptocurrencies' section, 100 results are displayed.  
  
**Test result:** 100 rows of the table with all cryptocurrencies are displayed  
  
## FE Test 2  
  
The second task for this test is feTask2.spec.js  
The aim of this test is to filter currencies according to price in range from $2.000 to $99.999 and after that, 5 cryptocurrencies should be selected by clicking on stars and added to Wishlist tab. A new tab should be displayed ('https://coinmarketcap.com/watchlist/').  
A test should verify is there, on the new Table are present previously selected cryptocurrencies. The table body should have five rows with the selected cryptocurrencies.  
For this aim cryptocurrency code abbreviations were used and compared.  
Also, the aim of the test was to confirm that all prices are within the selected range from $2.000 to $99.999.  
  
**Test result:** 5 cryptocurrencies are selected and displayed in new Table, and all prices are within the selected range from $2.000 to $99.999.  
  
## FE Test 3  
  
This test is an additional part of feTask2.spec.js with the aim to compare as much properties as possible.  
The nature of this site is specific because the displayed data changes in a short time and very often, and next that can be compared can be values of selected currencies. In the case that the values change, that means that the update of the site works.  
Time for changes depends on the stock market situation and can be different for each of the selected currencies.  
The test should be pass in the case that values are changed within 5 seconds which means that the sites is updated and displayed different values of Volume that or in other cases displayed unchanged values.  
  
**Test result:** 5 cryptocurrencies are selected and displayed in the new Table, and all prices are within the selected range from $2.000 to $99.999.  
The values of Volume for selected currencies are compared.