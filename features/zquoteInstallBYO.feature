Feature: As a Authorise User I Create a new customer and create a new install BYO Zquote

  @newBYOInstallGBR @newBYOinstallGBRCreditCard
  Scenario: Create a new customer for GBR with BYO install and payment method credit card
    Given I am logged in as csa on Salesforce for GBR
    And I have a rate plan BYO-INSTALL-GBR
    When I create a new customer account with prefix ""
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    And I should see ONETIME amount is populated
    When I convert rate plan in BYO
    Then I should see RECURRING amount is populated
    And I proceed to step 5 of zquote
    And I book a new non HAART job
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I select CREDIT_CARD as payment method
    And I enter CREDIT_CARD payment details
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
      | FIELD                | CONDITION | VALUE            |
#      | Invoice Status Row Count | INCREASED | +1               |
      | Invoice Status       | IS_EQUAL  | Posted           |
      | Invoice Payment Term | IS_EQUAL  | Due Upon Receipt |
#      | Payment Status Row Count | INCREASED    | +1         |
      | Payments Status       | IS_EQUAL  | Processed        |
      | Payment Methods Type  | IS_EQUAL  | CreditCard       |
    When I navigate to subscription page from account page
    And I validate the following on subscription page details tab
      | FIELD          | CONDITION | VALUE  |
      | Status         | IS_EQUAL  | Active |
      | Source Country | VALIDATE  |        |
      | Source         | IS_EQUAL  | Direct - Phone |
    When I navigate to account page from subscription page
    And I navigate to recent order page from account page
    And I validate the following on order page details tab
      | FIELD              | CONDITION | VALUE        |
      | Status             | IS_EQUAL  | In Progress  |
      | Fulfilment Type    | IS_EQUAL  | Installation |
      | Fulfilment Partner | IS_EQUAL  | S&R          |
    And I navigate to recent order page from account page
    And I validate the following on order page related tab
      | FIELD                 | CONDITION | VALUE       |
      | Job Status            | IS_EQUAL  | Scheduled   |
      | Job Reference Number  | VALIDATE  |             |
      | Order Products Status | IS_EQUAL  | Unfulfilled |
    And I validate the tax is calculated correctly

  @newBYOInstallGBR @newBYOInstallGBRDirectDebit
  Scenario: Create a new customer for GBR with BYO install and payment method direct debit
    Given I am logged in as csa on Salesforce for GBR
    And I have a rate plan BYO-INSTALL-GBR
    When I create a new customer account with prefix ""
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    And I should see ONETIME amount is populated
    When I convert rate plan in BYO
    Then I should see RECURRING amount is populated
    And I proceed to step 5 of zquote
    And I book a new non HAART job
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I select DIRECT_DEBIT as payment method
    And I enter DIRECT_DEBIT payment details
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
#      | Credit Card Number | IS_POPULATED |        |
    And I validate the following on billing account page related tab
      | FIELD                | CONDITION | VALUE            |
#      | Invoice Status Row Count | INCREASED | +1               |
      | Invoice Status       | IS_EQUAL  | Posted           |
      | Invoice Payment Term | IS_EQUAL  | Net 3 |
#      | Payment Status Row Count | INCREASED    | +1         |
#      | Payment Status       | IS_EQUAL  | Processed        |
      | Payment Methods Type  | IS_EQUAL  | BankTransfer       |
    When I navigate to subscription page from account page
    And I validate the following on subscription page details tab
      | FIELD          | CONDITION | VALUE  |
      | Status         | IS_EQUAL  | Active |
      | Source Country | VALIDATE  |        |
      | Source         | IS_EQUAL  | Direct - Phone |
    When I navigate to account page from subscription page
    And I navigate to recent order page from account page
    And I validate the following on order page details tab
      | FIELD              | CONDITION | VALUE        |
      | Status             | IS_EQUAL  | In Progress  |
      | Fulfilment Type    | IS_EQUAL  | Installation |
      | Fulfilment Partner | IS_EQUAL  | S&R          |
    And I navigate to recent order page from account page
    And I validate the following on order page related tab
      | FIELD                 | CONDITION | VALUE       |
      | Job Status            | IS_EQUAL  | Scheduled   |
      | Job Reference Number  | VALIDATE  |             |
      | Order Products Status | IS_EQUAL  | Unfulfilled |
    And I validate the tax is calculated correctly

  @newBYOInstallIRL
  Scenario: Create a new customer for IRL with BYO install and payment method direct debit
    Given I am logged in as csa on Salesforce for IRL
    And I have a rate plan BYO-INSTALL-IRL
    When I create a new customer account with prefix ""
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    And I should see ONETIME amount is populated
    When I convert rate plan in BYO
    Then I should see RECURRING amount is populated
    And I proceed to step 5 of zquote
    And I proceed to step 7 of zquote
    And I select CREDIT_CARD as payment method
    And I enter CREDIT_CARD payment details
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
      | FIELD                | CONDITION | VALUE            |
#      | Invoice Status Row Count | INCREASED | +1               |
      | Invoice Status       | IS_EQUAL  | Posted           |
      | Invoice Payment Term | IS_EQUAL  | Due Upon Receipt |
#      | Payment Status Row Count | INCREASED    | +1         |
      | Payments Status       | IS_EQUAL  | Processed        |
      | Payment Methods Type  | IS_EQUAL  | CreditCard       |
    When I navigate to subscription page from account page
    And I validate the following on subscription page details tab
      | FIELD          | CONDITION | VALUE  |
      | Status         | IS_EQUAL  | Active |
      | Source Country | VALIDATE  |        |
      | Source         | IS_EQUAL  | Direct - Phone |
    When I navigate to account page from subscription page
    And I validate the tax is calculated correctly
