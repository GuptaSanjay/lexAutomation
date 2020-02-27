Feature: Validate that delivery threshold feature is working as expected

  @DeliveryThresholdUK
  Scenario Outline: Validate that delivery threshold feature is working as expected
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I create a new customer account with prefix ""
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    Then I validate total and tax field on apply voucher page
    And I proceed to step 5 of zquote
    Then I should see they delivery is <Delivery Type>
    Examples:
      | Source Country | Rate Plan       | Delivery Type |
      | GBR            | FREEDELIVERY-UK | FREE          |
      | GBR            | PAIDDELIVERY-UK | PAID          |