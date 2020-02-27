@newPayment
Feature: As a Authorise User I Create a new zquote for existing customer with new payment

  @NewPaymentCreditToCredit
  Scenario: Create a new zquote with new credit card
    Given I am logged in as csa on Salesforce for GBR
    And I have a rate plan ONETIME-DELIVERY-GBR
    When I navigate to existing customer account page with ONETIME-DELIVERY-GBR and prefix ""
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    Then I validate total and tax field on apply voucher page
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I click on new payment method
    And I enter NEW_CREDIT_CARD payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    Then I validate that Quote Status is Sent to Z-Billing
    And I store the links for following account pages with Delivery rate plan
      | Billing |
    When I load billing account page
    Then I validate the following on the billing account page in details tab
      | FIELD              | CONDITION    | VALUE  |
      | Status             | IS_EQUAL     | Active |
      | Bill Cycle Day     | IS_POPULATED |        |
      | Credit Card Number | IS_POPULATED |        |
    And I validate the following on the billing account page in related tab
      | FIELD                | CONDITION | VALUE            |
      | Invoice Status       | IS_EQUAL  | Posted           |
      | Invoice Payment Term | IS_EQUAL  | Due Upon Receipt |
      | Payments Status      | IS_EQUAL  | Processed        |
      | Payment Methods Type | CONTAINS  | CreditCard       |

#  @NewPaymentCreditToDirectDebit
#  Scenario: Create a new zquote with new payment method as direct debit
#    Given I am logged in as csa on Salesforce for GBR
#    And I have a rate plan BYO-DELIVERY-GBR
#    When I navigate to existing customer account page with ONETIME-DELIVERY-GBR and prefix ""
#    When I start a new zquote for existing customer
#    And I select a product with given rate plan
#    And I should see ONETIME amount is populated
#    When I convert rate plan in BYO
#    Then I should see RECURRING amount is populated
#    And I proceed to step 5 of zquote
#    And I make a delivery selection
#    And I proceed to step 6 of zquote
#    And I proceed to step 7 of zquote
#    And I click on new payment method
#    And I select DIRECT_DEBIT as payment method
#    And I enter DIRECT_DEBIT payment details
#    Then I should see confirmation message for new quote
#    When I submit the zquote
#    And I goto customer account page
#    Then I validate that Quote Status is Sent to Z-Billing
#    And I navigate to Installation order page from account page
#    And I validate the following on billing account page details tab
#      | FIELD          | CONDITION    | VALUE  |
#      | Status         | IS_EQUAL     | Active |
#      | Bill Cycle Day | IS_POPULATED |        |
#    And I navigate to Installation order page from account page
#    And I validate the following on billing account page related tab
#      | FIELD                | CONDITION | VALUE      |
#      | Invoice Status       | IS_EQUAL  | Posted     |
#      | Invoice Payment Term | IS_EQUAL  | Net 3      |
#      | Payment Methods Type | CONTAINS  | BankTransfer |

#  @NewPaymentDirectDebitToCredit
#  Scenario: Create a new zquote with new payment method as credit card
#    Given I am logged in as csa on Salesforce for GBR
#    And I have a rate plan BYO-DELIVERY-GBR
#    When I navigate to existing customer account page with BYO-DELIVERY-GBR and prefix "DD_"
#    When I start a new zquote for existing customer
#    And I select a product with given rate plan
#    And I should see ONETIME amount is populated
#    When I convert rate plan in BYO
#    Then I should see RECURRING amount is populated
#    And I proceed to step 5 of zquote
#    And I make a delivery selection
#    And I proceed to step 6 of zquote
#    And I proceed to step 7 of zquote
#    And I click on new payment method
#    And I select NEW_CREDIT_CARD as new payment method
#    And I enter NEW_CREDIT_CARD payment details
#    Then I should see confirmation message for new quote
#    When I submit the zquote
#    And I goto customer account page
#    Then I validate that Quote Status is Sent to Z-Billing
#    And I navigate to recent order page from account page
#    And I validate the following on billing account page details tab
#      | FIELD          | CONDITION    | VALUE  |
#      | Status         | IS_EQUAL     | Active |
#      | Bill Cycle Day | IS_POPULATED |        |
#    And I navigate to recent order page from account page
#    And I validate the following on billing account page related tab
#      | FIELD                | CONDITION | VALUE      |
#      | Invoice Status       | IS_EQUAL  | Posted     |
#      | Invoice Payment Term | IS_EQUAL  | Net 3      |
#      | Payment Methods Type | CONTAINS  | BankTransfer |
#
