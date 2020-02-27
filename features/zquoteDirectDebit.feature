@newZquoteGBRDirectDebit
Feature: As a Authorise User I Create a new customer and create a new zquote with direct debit payment

  Scenario Outline: Create a new user for <Source Country> with zquote with direct debit payment
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I create a new customer account with prefix "DD_"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    Then I validate total and tax field on apply voucher page
    And I proceed to step 5 of zquote
#    And I make a delivery selection
#    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I select DIRECT_DEBIT as payment method
    And I enter DIRECT_DEBIT payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    Then I validate that Quote Status is Sent to Z-Billing
    And I store the links for following account pages with Non_delivery_install rate plan
      | Billing | Subscription |
    When I wait and refresh customer account page for account type to be Customer
    Then I validate account type is Customer
    When I load billing account page
    Then I validate the following on the billing account page in details tab
      | FIELD          | CONDITION    | VALUE  |
      | Status         | IS_EQUAL     | Active |
      | Bill Cycle Day | IS_POPULATED |        |
    And I validate the following on the billing account page in related tab
      | FIELD                | CONDITION | VALUE  |
      | Invoice Status       | IS_EQUAL  | Posted |
      | Invoice Payment Term | IS_EQUAL  | Net 3  |
    When I load subscription account page
    Then I validate the following on the subscription page in details tab
      | FIELD          | CONDITION | VALUE  |
      | Status         | IS_EQUAL  | Active |
      | Source Country | VALIDATE  |        |
      | Source         | IS_EQUAL  | Direct - Phone |
    Examples:
      | Source Country | Rate Plan    |
      | GBR            | HIVELIVE-GBR |
