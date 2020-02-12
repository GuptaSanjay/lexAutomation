const { Given, When, Then } = require("cucumber");
// const { expect } = require("chai");

Given("a variable set to {int}", async function(number) {
  // // this.setTo(number);
  await this.driver.get("https://test.salesforce.com/");
  await this.driver.sleep(2000);
  console.log('Mandeep');
});

When("I increment the variable by {int}", async function(number) {
  // await this.driver.findElement({xpath: './/li[@class="orb-nav-weather"]/a'}).click();
  let title1 = await this.driver.getTitle();
  console.log(title1);
  console.log('Singh');
});

Then("the variable should contain {int}", function(number) {
  // expect(this.variable).to.eql(number);
});