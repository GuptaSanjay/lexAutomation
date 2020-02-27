Feature:
  Running the script to create test data for cancellation process

  Scenario Outline: ETF Cancellation test data
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I create a new customer account with prefix "ETF_"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    And I should see ONETIME amount is populated
    When I convert rate plan in BYO
    Then I should see RECURRING amount is populated
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I select CREDIT_CARD as payment method
    And I enter CREDIT_CARD payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
  @NewETFZQuoteUK
    Examples:
      | Source Country | Rate Plan        |
      | GBR            | BYO-DELIVERY-GBR |
  @NewETFZQuotIRL
    Examples:
      | Source Country | Rate Plan        |
      | IRL            | BYO-DELIVERY-IRL |

  Scenario Outline: Multi Quantity test data
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I create a new customer account with prefix "MultiQty_"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    When I update the quantity of selected product to 5
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I enter CREDIT_CARD payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    @NewMultiQtyZQuoteUK
    Examples:
      | Source Country | Rate Plan        |
      | GBR            | BYO-DELIVERY-GBR |
    @NewMultiQtyZQuoteIRL
    Examples:
      | Source Country | Rate Plan        |
      | IRL            | BYO-DELIVERY-IRL |

  Scenario Outline: Partial cancellation test data
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I create a new customer account with prefix "MultiQty_"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    And I should see ONETIME amount is populated
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
    And I enter CREDIT_CARD payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    @NewPartialZQuoteUK
    Examples:
      | Source Country | Rate Plan        |
      | GBR            | BYO-DELIVERY-GBR |
    @NewPartialZQuoteIRL
    Examples:
      | Source Country | Rate Plan        |
      | IRL            | BYO-DELIVERY-IRL |

  Scenario Outline: Zero price cancellation test data
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
#    When I create a new customer account with prefix "Zero_"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with given rate plan
    When I update the quantity of selected product to 2
    And I apply voucher 100_PERCENT
    And I proceed to step 5 of zquote
    And I make a delivery selection
    And I proceed to step 6 of zquote
    And I proceed to step 7 of zquote
#    And I enter CREDIT_CARD payment details
    Then I should see confirmation message for new quote
    When I submit the zquote
    And I goto customer account page
    @NewZeroZQuoteUK
    Examples:
      | Source Country | Rate Plan        |
      | GBR            | BYO-DELIVERY-GBR |
    @NewZeroZQuoteIRL
    Examples:
      | Source Country | Rate Plan        |
      | IRL            | BYO-DELIVERY-IRL |

