Feature: As a CSA I cancel a subscription and create refund

  Scenario Outline: As a CSA I process a Full Cancellation and refund for <Source Country> subscription
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to Today active subscription
    And I take record of the following from Subscription Page details tab
      | Account Name | Version | Subscription Name | Subscription Start Date | Order Status |
#    And I take record of the following from Billing Account page
#      | Bill Cycle Day |
#    And I navigate to given subscription from billing account page
    And I cancel the subscription
    Then I validate the following on case page details tab
      | FIELD            | CONDITION | VALUE        |
      | Status           | IS_EQUAL  | Open         |
      | Case Record Type | CONTAINS  | Cancellation |
      | Subscription     | VALIDATE  |              |
    And I store the links for following case pages with Delivery rate plan
      | Subscription |
    When I process the cancellation for case with following
      | Cancellation Type   | Full Cancellation |
      | Cancellation Action | Cancel & Refund   |
    Then I validate the following on cancel and refund page
      | FIELD                   | CONDITION | VALUE |
      | New Quantity            | IS_EQUAL  | 0     |
#      | Bill Cycle Day          | VALIDATE  |       |
      | Subscription Start Date | VALIDATE  |       |
    When I click submit for cancellation
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | FIELD  | CONDITION | VALUE  |
      | Status | IS_EQUAL  | Closed |
    And  I take record of the following from Case Page
      | Refunded Amount |
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Status to be Cancelled
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE     |
      | Status  | IS_EQUAL  | Cancelled |
      | Version | INCREASED |           |
#      | Order Status | VALIDATE  |           |
    When I am logged in on Zuora
    And I navigate to given customer account page on zuora
    Then I should see following invoice information on zuora customer account page
      | FIELD               | CONDITION | VALUE     |
      | Subscription Status | IS_EQUAL  | Cancelled |
      | Invoice Status      | IS_EQUAL  | Posted    |
    Then I should see following refund information on zuora customer account page
      | FIELD           | CONDITION | VALUE |
      | Refunded Amount | VALIDATE  |       |
      | Refund Status   | IS_EQUAL  | Error |
    @CancellationRefundUK @FullCancellationRefundUK
    Examples:
      | Source Country |
      | GBR            |
    @CancellationRefundIRL @FullCancellationRefundIRL
    Examples:
      | Source Country |
      | IRL            |

  Scenario Outline: As a CSA I partially cancel and refund for <Source Country> subscription
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to Partial active subscription
    And I take record of the following from Subscription Page details tab
      | Account Name | Version | Subscription Name | Subscription Start Date |
    And I take record of the following from Subscription Page related tab
      | Subscription Rate Plan Count | Order Status |
  #    And I go to billing account page from subscription page
#    And I take record of the following from Billing Account page
#      | Bill Cycle Day |
#    And I navigate to given subscription from billing account page
    And I cancel the subscription
    Then I validate the following on case page details tab
      | Status           | IS_EQUAL | Open         |
      | Case Record Type | CONTAINS | Cancellation |
      | Subscription     | VALIDATE |              |
    And I store the links for following case pages with Delivery rate plan
      | Subscription |
    When I process the cancellation for case with following
      | Cancellation Type   | Partial Cancellation |
      | Cancellation Action | Cancel & Refund      |
    And I remove a product from order products list
    Then I validate the following on cancel and refund page
      | FIELD                      | CONDITION | VALUE |
      | Cancelled Product Quantity | IS_EQUAL  | 0     |
#      | Bill Cycle Day             | VALIDATE |   |
      | Subscription Start Date    | VALIDATE  |       |
    When I click submit for cancellation
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | FIELD  | CONDITION | VALUE  |
      | Status | IS_EQUAL  | Closed |
    And  I take record of the following from Case Page
      | Refunded Amount |
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Version to be 2
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE  |
      | Status  | IS_EQUAL  | Active |
      | Version | INCREASED |        |
    And I validate the following on the subscription page in related tab
      | FIELD                        | CONDITION | VALUE     |
      | Subscription Rate Plan Count | DECREASED |           |
#      | Order Status                 | IS_EQUAL  | Completed |
    When I am logged in on Zuora
    And I navigate to given customer account page on zuora
    Then I should see following invoice information on zuora customer account page
      | FIELD               | CONDITION | VALUE  |
      | Subscription Status | IS_EQUAL  | Active |
      | Invoice Status      | IS_EQUAL  | Posted |
    Then I should see following refund information on zuora customer account page
      | FIELD           | CONDITION | VALUE     |
      | Refunded Amount | VALIDATE  |           |
      | Refund Status   | IS_EQUAL  | Processed |
    @CancellationRefundUK @PartialCancellationRefundUK
    Examples:
      | Source Country |
      | GBR            |
    @CancellationRefundIRL @PartialCancellationRefundIRL
    Examples:
      | Source Country |
      | IRL            |

  Scenario Outline: As a CSA I partially cancel by updating the quantity and refund for <Source Country> subscription
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to MultiQty 7 Days active subscription
    And I take record of the following from Subscription Page details tab
      | Account Name | Version | Subscription Name | Subscription Start Date |
    And I take record of the following from Subscription Page related tab
      | Subscription Rate Plan Count | Product Quantity | Order Status |
#    And I go to billing account page from subscription page
#    And I take record of the following from Billing Account page
#      | Bill Cycle Day |
#    And I navigate to given subscription from billing account page
    And I cancel the subscription
    Then I validate the following on case page details tab
      | Status           | IS_EQUAL | Open         |
      | Case Record Type | CONTAINS | Cancellation |
      | Subscription     | VALIDATE |              |
    And I store the links for following case pages with Delivery rate plan
      | Subscription |
    When I process the cancellation for case with following
      | Cancellation Type   | Partial Cancellation |
      | Cancellation Action | Cancel & Refund      |
    And I update quantity of the product by decreasing one from products list
    Then I validate the following on cancel and refund page
      | Cancelled Product Quantity | DECREASED |  |
#      | Bill Cycle Day             | VALIDATE  |  |
      | Subscription Start Date    | VALIDATE  |  |
    When I click submit for cancellation
#    When I click Cancel and Refund button
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | Status | IS_EQUAL | Closed |
    And  I take record of the following from Case Page
      | Refunded Amount |
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Version to be 2
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE  |
      | Status  | IS_EQUAL  | Active |
      | Version | INCREASED |        |
    Then I validate the following on the subscription page in related tab
      | FIELD                        | CONDITION | VALUE     |
      | Subscription Rate Plan Count | VALIDATE  |           |
      | Order Status                 | IS_EQUAL  | Completed |
      | Product Quantity             | DECREASED |           |
    When I am logged in on Zuora
    And I navigate to given customer account page on zuora
    Then I should see following invoice information on zuora customer account page
      | FIELD               | CONDITION | VALUE  |
      | Subscription Status | IS_EQUAL  | Active |
      | Invoice Status      | IS_EQUAL  | Posted |
    Then I should see following refund information on zuora customer account page
      | FIELD           | CONDITION | VALUE     |
      | Refunded Amount | VALIDATE  |           |
      | Refund Status   | IS_EQUAL  | Processed |
    @CancellationRefundUK @QuantityCancellationUK
    Examples:
      | Source Country |
      | GBR            |
    @CancellationRefundIRL @QuantityCancellationIRL
    Examples:
      | Source Country |
      | IRL            |

  Scenario Outline: As a CSA I process a Full Cancellation for a Zero Price subscription for <Source Country>
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to Zero Price active subscription
    And I take record of the following from Subscription Page details tab
      | Account Name | Version | Subscription Name | Subscription Start Date |
    And I take record of the following from Subscription Page related tab
      | Order Status |
#    And I go to billing account page from subscription page
#    And I take record of the following from Billing Account page
#      | Bill Cycle Day |
#    And I navigate to given subscription from billing account page
    And I cancel the subscription
    Then I validate the following on case page details tab
      | Status           | IS_EQUAL | Open         |
      | Case Record Type | CONTAINS | Cancellation |
      | Subscription     | VALIDATE |              |
    And I store the links for following case pages with Delivery rate plan
      | Subscription |
    When I process the cancellation for case with following
      | Cancellation Type   | Full Cancellation |
      | Cancellation Action | Cancel & Refund   |
    Then I validate the following on cancel and refund page
      | New Quantity            | IS_EQUAL | 0 |
#      | Bill Cycle Day          | VALIDATE |   |
      | Subscription Start Date | VALIDATE |   |
    When I click submit for cancellation
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | FIELD  | CONDITION | VALUE  |
      | Status | IS_EQUAL  | Closed |
#    Then I should see the Total Refund Amount to be <Refunded Amount>
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Status to be Cancelled
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE     |
      | Status  | IS_EQUAL  | Cancelled |
      | Version | INCREASED |           |
    Then I validate the following on the subscription page in related tab
      | FIELD        | CONDITION | VALUE     |
      | Order Status | IS_EQUAL  | Completed |
    When I am logged in on Zuora
    And I navigate to given customer account page on zuora
    Then I should see following invoice information on zuora customer account page
      | FIELD               | CONDITION | VALUE     |
      | Subscription Status | IS_EQUAL  | Cancelled |
#      | Invoice Status      | IS_EQUAL  | Posted    |
    @CancellationRefundUK @ZeroPriceCancellationUK
    Examples:
      | Source Country | Refunded Amount |
      | GBR            | GBP 0.00        |
    @CancellationRefundIRL @ZeroPriceCancellationIRL
    Examples:
      | Source Country | Refunded Amount |
      | IRL            | GBP 0.00        |