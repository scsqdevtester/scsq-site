/**
 * Jasmine Unit Tests app.js
 */

'use strict';

/**
 * describe your code
 */
describe ('app.js' , function(){

  //what it should do
  it ('should define a global namespace object', function(){
      //expect something
      expect (myNamespace).toBeDefined();
      expect (myNamespace).not.toBeDefined();
  });

});