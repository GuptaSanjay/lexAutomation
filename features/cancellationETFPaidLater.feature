Feature: As a CSA I cancel a subscription and create refund

  Scenario Outline: As a CSA I process a Full Cancellation and refund for <Source Country> subscription
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to ETF active subscription
    And I take record of the following from Subscription Page details tab
      | Account Name | Version | Subscription Name | Subscription Start Date | Order Status |
#    And I take record of the following from Billing Account page
#      | Bill Cycle Day |
#    And I navigate to given subscription from billing account page
    And I cancel the subscription
    Then I validate the following on case page details tab
      | FIELD            | CONDITION | VALUE        |
      | Status           | IS_EQUAL  | Open         |
      | Case Record Type | IS_EQUAL  | Cancellation |
      | Subscription     | VALIDATE  |              |
    And I store the links for following case pages with Delivery rate plan
      | Subscription |
    When I process the cancellation for case with following
      | Cancellation Type   | Full Cancellation |
      | Cancellation Action | Cancel with ETF   |
    Then I validate the following on cancel and refund page
      | FIELD                   | CONDITION | VALUE |
      | New Quantity            | IS_EQUAL  | 0     |
#      | Bill Cycle Day          | VALIDATE  |       |
      | Subscription Start Date | VALIDATE  |       |
    When I click submit for cancellation with Paid Later
    Then I validate the following on case page details tab
      | FIELD      | CONDITION | VALUE                                |
      | Status     | IS_EQUAL  | Open                                 |
      | ETF Status | IS_EQUAL  | Outstanding Balance to be paid later |
    And I take record of the following from Case Page
      | ETF Amount |
    When I click on pay outstanding ETF
    Then I validate the following on ETF Subscription Page
      | FIELD        | CONDITION | VALUE                                |
      | Subscription | VALIDATE  |                                      |
      | ETF Status   | IS_EQUAL  | Outstanding Balance to be paid later |
      | ETF Amount   | VALIDATE  |                                      |
    When I click on Process Payment on ETF Subscription Page
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | Status     | IS_EQUAL | Closed |
      | ETF Status | IS_EQUAL | Paid   |
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Status to be Cancelled
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE     |
      | Status  | IS_EQUAL  | Cancelled |
      | Version | INCREASED |           |
#      | Order Status | VALIDATE  |           |
#    When I am logged in on Zuora
#    And I navigate to given customer account page on zuora
#    Then I should see following invoice information on zuora customer account page
#      | FIELD               | CONDITION | VALUE     |
#      | Subscription Status | IS_EQUAL  | Active |
#      | Invoice Status      | IS_EQUAL  | Posted    |
#    Then I should see following payments information on zuora customer account page
#      | FIELD          | CONDITION | VALUE     |
#      | ETF amount     | VALIDATE  |           |
#      | Payment Status | IS_EQUAL  | Processed |
   @CancellationPaidLaterUK @FullCancellationETFPaidLaterUK
    Examples:
      | Source Country |
      | GBR            |
    @CancellationPaidLaterIRL @FullCancellationETFPaidLaterIRL
    Examples:
      | Source Country |
      | IRL            |

  Scenario Outline: As a CSA I partially cancel and refund for <Source Country> subscription
    Given I am logged in as csa on Salesforce for <Source Country>
    When I navigate to ETF active subscription
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
      | Cancellation Action | Cancel with ETF      |
    And I remove a product from order products list
    Then I validate the following on cancel and refund page
      | FIELD                      | CONDITION | VALUE |
      | Cancelled Product Quantity | IS_EQUAL  | 0     |
#      | Bill Cycle Day             | VALIDATE |   |
      | Subscription Start Date    | VALIDATE  |       |
    When I click submit for cancellation with Paid Later
    Then I validate the following on case page details tab
      | FIELD      | CONDITION | VALUE                                |
      | Status     | IS_EQUAL  | Open                                 |
      | ETF Status | IS_EQUAL  | Outstanding Balance to be paid later |
    And I take record of the following from Case Page
      | ETF Amount |
    When I click on pay outstanding ETF
    Then I validate the following on ETF Subscription Page
      | FIELD        | CONDITION | VALUE                                |
      | Subscription | VALIDATE  |                                      |
      | ETF Status   | IS_EQUAL  | Outstanding Balance to be paid later |
      | ETF Amount   | VALIDATE  |                                      |
    When I click on Process Payment on ETF Subscription Page
    And I wait and refresh case view page for Status to be Closed
    Then I validate the following on case page details tab
      | FIELD      | CONDITION | VALUE  |
      | Status     | IS_EQUAL  | Closed |
      | ETF Status | IS_EQUAL  | Paid   |
#    And I navigate to subscription page from case page
    When I load subscription account page
    And I wait and refresh subscription page for Status to be Cancelled
    Then I validate the following on the subscription page in details tab
      | FIELD   | CONDITION | VALUE  |
      | Status  | IS_EQUAL  | Active |
      | Version | INCREASED |        |
    And I validate the following on the subscription page in related tab
      | FIELD                        | CONDITION | VALUE |
      | Subscription Rate Plan Count | DECREASED |       |
#      | Order Status                 | VALIDATE  |       |
#    When I am logged in on Zuora
#    And I navigate to given customer account page on zuora
#    Then I should see following invoice information on zuora customer account page
#      | FIELD               | CONDITION | VALUE     |
#      | Subscription Status | IS_EQUAL  | Active |
#      | Invoice Status      | IS_EQUAL  | Posted    |
#    Then I should see following payments information on zuora customer account page
#      | FIELD          | CONDITION | VALUE     |
#      | ETF amount     | VALIDATE  |           |
#      | Payment Status | IS_EQUAL  | Processed |
    @CancellationPaidLaterUK @PartialCancellationETFPaidLaterUK
    Examples:
      | Source Country |
      | GBR            |
    @CancellationPaidLaterIRL @PartialCancellationETFPaidLaterIRL
    Examples:
      | Source Country |
      | IRL            |
