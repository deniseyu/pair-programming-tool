module.exports = function(){

  var zombie = require('zombie');
  var assert = require('chai').assert;
  this.browser = new zombie();

  this.Given(/^I am on the home page$/, function (callback) {
  });

  this.Then(/^I should see 'Makers Academy Pair Programming Tool'$/, function (callback) {
    this.browser.visit('http://localhost:3000/').then(function(){
      assert.equal(browser.text('h2'), 'Makers Academy Pair Programming Tool');
    }
    // callback.pending();
  });

  this.When(/^I click on Craig's picture$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I should see a menu with the text 'Do you want to pair with Craig today\?'$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I click on my own picture$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I should see the name of the last person I paired with$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });


};