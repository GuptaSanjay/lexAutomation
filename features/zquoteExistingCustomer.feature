@ExistingCustomerZquote
Feature: Dependency rate plans are added when I add a Hive video playback tier rate plan

  @testOneIDFix
  Scenario Outline: Validate dependency rate plans are added for Hive video playback tier rate plan (Monthly)
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I navigate to existing customer account page with <Rate Plan> and prefix ""
    And I take the record count for following sections
      | Subscriptions | Orders |
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    Then I validate total and tax field on apply voucher page
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I select an existing Card payment method
    Then I should see confirmation message for existing quote
    When I submit the zquote
    Then I validate that Quote Status is Sent to Z-Billing
    And I store the links for following account pages with Delivery rate plan
      | Subscription | Order | Quote |
    And I validate on account page a new subscription is created
    And I validate on account page a new order is created
    When I load subscription account page
    Then I validate the following on the subscription page in details tab
      | FIELD          | CONDITION | VALUE  |
      | Status         | IS_EQUAL  | Active |
      | Source Country | VALIDATE  |        |
      | Source         | VALIDATE  |        |
    When I load deliveryOrder account page
    Then I validate the following on the order page in details tab
      | FIELD              | CONDITION | VALUE                 |
      | Status             | IS_EQUAL  | In Progress           |
      | Fulfilment Type    | IS_EQUAL  | Delivery              |
      | Fulfilment Partner | IS_EQUAL  | <Fulfillment Partner> |
    And I validate the following on the order page in related tab
      | Job Status            | IS_EQUAL | In Progress   |
#      | Job Reference Number  | VALIDATE |             |
      | Order Products Status | IS_EQUAL | Unfulfilled |
    And I validate the tax is calculated correctly

    Examples:
      | Source Country | Rate Plan                | Fulfillment Partner |
      | GBR            | ONETIME-DELIVERY-GBR-NEW | Exertis             |
      | IRL            | ONETIME-DELIVERY-IRL-NEW | Exertis             |

      | USA            | ONETIME-DELIVERY-USA-NEW | Shipwire         |
      | CAN            | ONETIME-DELIVERY-CAN-NEW | Shipwire         |
