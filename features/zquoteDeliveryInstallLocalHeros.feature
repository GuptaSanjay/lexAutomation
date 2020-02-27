Feature: As a Authorise User I Create a new customer and create a new install zquote

  @DeliveryInstallLocalHero
  Scenario Outline: Create a new user for GBR with install rateplan zquote
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have multiple rate plans <Rate Plan>
    When I create a new customer account with prefix ""
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    Then I validate total and tax field on apply voucher page
    And I proceed to step 5 of zquote
    And I make a delivery selection and book a new non HAART job
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I enter <Payment Type> payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    When I wait and refresh customer account page for account type to be Customer
    Then I validate account type is Customer
    Then I validate that Quote Status is Sent to Z-Billing
    And I validate the following on billing account page details tab
      | FIELD              | CONDITION    | VALUE  |
      | Status             | IS_EQUAL     | Active |
      | Bill Cycle Day     | IS_POPULATED |        |
      | Credit Card Number | IS_POPULATED |        |
    And I validate the following on billing account page related tab
      | Invoice Status       | IS_EQUAL | Posted           |
      | Invoice Payment Term | IS_EQUAL | Due Upon Receipt |
      | Payments Status      | IS_EQUAL | Processed        |
      | Payment Methods Type | CONTAINS | CreditCard       |
    When I navigate to subscription page from account page
    And I validate the following on subscription page details tab
      | FIELD          | CONDITION | VALUE          |
      | Status         | IS_EQUAL  | Active         |
      | Source Country | VALIDATE  |                |
      | Source         | IS_EQUAL  | Direct - Phone |
    When I navigate to account page from subscription page
    And I navigate to Delivery order page from account page
    Then I validate the following on order page details tab
      | FIELD              | CONDITION | VALUE       |
      | Status             | IS_EQUAL  | In Progress |
      | Fulfilment Type    | IS_EQUAL  | Delivery    |
      | Fulfilment Partner | IS_EQUAL  | Exertis     |
    And I navigate to Installation order page from account page
    And I validate the following on order page details tab
      | FIELD              | CONDITION | VALUE        |
      | Status             | IS_EQUAL  | In Progress  |
      | Fulfilment Type    | IS_EQUAL  | Installation |
      | Fulfilment Partner | IS_EQUAL  | S&R          |
    And I navigate to Installation order page from account page
    And I validate the following on order page related tab
      | FIELD                 | CONDITION | VALUE       |
      | Job Status            | IS_EQUAL  | Scheduled   |
      | Job Reference Number  | VALIDATE  |             |
      | Order Products Status | IS_EQUAL  | Unfulfilled |
#    And I validate the tax is calculated correctly
    Examples:
      | Source Country | Rate Plan                    |
      | GBR            | LOCAL_HERO-INSTALL-DELIVERY-GBR |
