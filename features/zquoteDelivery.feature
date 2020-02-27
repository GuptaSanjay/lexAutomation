Feature: As a Authorise User I Create a new customer and create a new delivery zquote

  Scenario Outline: Create a new user for <Source Country> with zquote
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
#    When I create a new customer account with prefix ""
#    Then I validate account type is Prospect
#    When I start a new zquote for new customer
#    And I select a product with given rate plan
#    Then I validate total and tax field on apply voucher page
#    And I proceed to step 5 of zquote
#    And I make a delivery selection
#    And I proceed to step 6 of zquote
#    And I proceed to step 7 of zquote
#    And I enter <Payment Type> payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    When I wait and refresh customer account page for account type to be Customer
    Then I validate account type is Customer
    Then I validate that Quote Status is Sent to Z-Billing
    And I store the links for following account pages with Delivery rate plan
      | Billing | Subscription | Order | Quote |
    When I load billing account page
    Then I validate the following on the billing account page in details tab
      | FIELD              | CONDITION    | VALUE  |
      | Status             | IS_EQUAL     | Active |
      | Bill Cycle Day     | IS_POPULATED |        |
      | Credit Card Number | IS_POPULATED |        |
    And I validate the following on the billing account page in related tab
      | FIELD                | CONDITION | VALUE            |
#      | Invoice Status Row Count | INCREASED | +1               |
      | Invoice Status       | IS_EQUAL  | Posted           |
      | Invoice Payment Term | IS_EQUAL  | Due Upon Receipt |
#      | Payment Status Row Count | INCREASED    | +1         |
      | Payments Status      | IS_EQUAL  | Processed        |
      | Payment Methods Type | CONTAINS  | CreditCard       |
    When I load subscription account page
    Then I validate the following on the subscription page in details tab
      | FIELD          | CONDITION | VALUE          |
      | Status         | IS_EQUAL  | Active         |
      | Source Country | VALIDATE  |                |
      | Source         | IS_EQUAL  | Direct - Phone |
    When I load deliveryOrder account page
    Then I validate the following on the order page in details tab
      | FIELD              | CONDITION | VALUE                 |
      | Status             | IS_EQUAL  | In Progress           |
      | Fulfilment Type    | IS_EQUAL  | Delivery              |
      | Fulfilment Partner | IS_EQUAL  | <Fulfillment Partner> |
#      | Job Status            | IS_EQUAL  | Scheduled             | //For Install
#      | Job Reference Number  | VALIDATE |                       |
#      | Order Products Status | IS_EQUAL  | Unfulfilled           |
    And I validate the tax is calculated correctly
    @newDeliveryZquoteGBR
    Examples:
      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type |
      | GBR            | ONETIME-DELIVERY-GBR | Exertis             | CREDIT_CARD  |
#    @newDeliveryZquoteUSA
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type          |
#      | USA            | ONETIME-DELIVERY-USA | Shipwire            | CREDIT_CARD           |
#      | USA            | ONETIME-DELIVERY-USA | Shipwire            | CREDIT_CARD_AMEX      |
#      | USA            | ONETIME-DELIVERY-USA | Shipwire            | CREDIT_CARD_DISCOVERY |
#    @newDeliveryZquoteCAN
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type          |
#      | CAN            | ONETIME-DELIVERY-CAN | Shipwire            | CREDIT_CARD           |
#      | CAN            | ONETIME-DELIVERY-CAN | Shipwire            | CREDIT_CARD_AMEX      |
#      | CAN            | ONETIME-DELIVERY-CAN | Shipwire            | CREDIT_CARD_DISCOVERY |
#    @newDeliveryZquoteIRL
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type |
#      | IRL            | ONETIME-DELIVERY-IRL | Exertis             | CREDIT_CARD  |
#    @newDeliveryZquoteITA
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type |
#      | ITA            | ONETIME-DELIVERY-ITA | Ingram              | CREDIT_CARD  |
#    @newDeliveryZquoteFRA
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type |
#      | FRA            | ONETIME-DELIVERY-FRA | Ingram              | CREDIT_CARD  |
#    @newDeliveryZquoteHUChamp
#    Examples:
#      | Source Country | Rate Plan            | Fulfillment Partner | Payment Type |
#      | GBR            | ONETIME-DELIVERY-GBR | Exertis             | CREDIT_CARD  |
#
#  Scenario: As a  HU Champion create a new customer with Delivery ZQuote for GBR (One time)
#    Given I am logged in as BIQ on Salesforce for GBR
#    And I have a rate plan ONETIME-DELIVERY-GBR
#    When I create a new customer account with prefix ""
#    Then I validate account type is Prospect
#    When I start a new zquote for new customer
#    And I select a product with given rate plan
#    And I proceed to step 4 of zquote
#    Then I should see <Amount Type> amount is populated
#    When I proceed to step 5 of zquote
#    When I make a delivery selection
#    And I proceed to step 6 of zquote
#    When I proceed to step 7 of zquote
#    And I enter <Payment Type> payment details
#    Then I should see confirmation message for new quote
#    When I submit the zquote
#    When I wait and refresh customer account page for account type to be Customer
#    Then I validate account type is Customer
#    Then I validate that Quote Status is Sent to Z-Billing
#    And I store the links for following account pages with Delivery rate plan
#      | Billing | Subscription | Order | Quote |
#    When I load billing account page
#    Then I validate the following on the billing account page in details tab
#      | FIELD              | CONDITION    | VALUE  |
#      | Status             | IS_EQUAL     | Active |
#      | Bill Cycle Day     | IS_POPULATED |        |
#      | Credit Card Number | IS_POPULATED |        |
#    And I validate the following on the billing account page in details tab
#      | FIELD                | CONDITION | VALUE            |
##      | Invoice Status Row Count | INCREASED    | +1         |
#      | Invoice Status       | IS_EQUAL  | Posted           |
#      | Invoice Payment Term | IS_EQUAL  | Due Upon Receipt |
##      | Payment Status Row Count | INCREASED    | +1         |
#      | Payments Status      | IS_EQUAL  | Processed        |
#      | Payment Methods Type | IS_EQUAL  | CreditCard       |
#    When I load subscription account page
#    Then I validate the following on the subscription page in details tab
#      | FIELD          | CONDITION | VALUE  |
#      | Status         | IS_EQUAL  | Active |
#      | Source Country | VALIDATE  |        |
#      | Source         | VALIDATE  |        |
#    When I load order account page
#    Then I validate the following on the order page in details tab
#      | FIELD              | CONDITION | VALUE       |
#      | Status             | IS_EQUAL  | In Progress |
#      | Fulfilment Type    | IS_EQUAL  | Delivery    |
#      | Fulfilment Partner | IS_EQUAL  | Exertis     |
#    And I validate the following on the order page in related tab
#      | FIELD                 | CONDITION | VALUE       |
#      | Order Products Status | IS_EQUAL  | Unfulfilled |
#    And I validate the tax is calculated correctly
