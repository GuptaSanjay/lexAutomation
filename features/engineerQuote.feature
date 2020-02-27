Feature: As a CSA I create an Engineer Quote

  Scenario Outline: Create an <Quote Type> quote
    Given I am on General help page on web for UK
    And I am logged in as csa on Salesforce for GBR
    When I create a new Address
    And I create a new <Quote Type> Engineer Quote
    And I create a new <Quote Type> engineer quote line item
    Then I should see the following on engineer quote page related tab
      | FIELD       | CONDITION | VALUE         |
      | Quantity    | IS_EQUAL  | 1             |
      | Price       | IS_EQUAL  | <Price>       |
      | Total Price | IS_EQUAL  | <Total Price> |
      | Job Time    | IS_EQUAL  | <Job Time>    |
    Then I should see the following on engineer quote page details tab
      | FIELD       | CONDITION | VALUE          |
      | Status      | IS_EQUAL  | Open           |
      | Record Type | CONTAINS  | Engineer Quote |
#      | Quote Date  | CONTAINS  | <Quote Date>   |
#      | Expiry Date | CONTAINS  | <Expiry Date>  |
    When I complete <Quote Type> sales over the phone
    And I go back to engineer quote page
    And I wait and refresh engineer quote page for Status to be Paid
    Then I should see the following on engineer quote page details tab
      | FIELD        | CONDITION    | VALUE |
      | Status       | IS_EQUAL     | Paid  |
      | Subscription | IS_POPULATED |       |
      | Job          | IS_POPULATED |       |
      | Contact      | IS_POPULATED |       |
    @EngQuote @EngQuoteInday
    Examples:
      | Profile | Quote Type  | Price      | Total Price | Quote Date | Expiry Date | Job Time |
      | CSA     | In-day      | GBP 179.00 | GBP 179.00  | Today      | Today       | 90       |
    @EngQuote @EngQuoteFutureday
    Examples:
      | Profile | Quote Type  | Price      | Total Price | Quote Date | Expiry Date | Job Time |
      | CSA     | Future-day  | GBP 249.00 | GBP 249.00  | Today      | Today + 28  | 90       |

  Scenario Outline: Create an <Quote Type> quote
    Given I am on General help page on web for UK
    And I am logged in as csa on Salesforce for GBR
    When I create a new Address
    And I create a new <Quote Type> Engineer Quote
    And I create a new <Quote Type> engineer quote line item
    Then I should see the following on engineer quote page related tab
      | FIELD       | CONDITION | VALUE         |
      | Quantity    | IS_EQUAL  | 1             |
      | Price       | IS_EQUAL  | <Price>       |
      | Total Price | IS_EQUAL  | <Total Price> |
      | Job Time    | IS_EQUAL  | <Job Time>    |
    Then I should see the following on engineer quote page details tab
      | FIELD       | CONDITION | VALUE          |
      | Status      | IS_EQUAL  | Open           |
      | Record Type | CONTAINS  | Engineer Quote |
#      | Quote Date  | CONTAINS  | <Quote Date>   |
#      | Expiry Date | CONTAINS  | <Expiry Date>  |
    When I complete <Quote Type> sales over the phone
    And I go back to engineer quote page
    And I wait and refresh engineer quote page for Status to be Paid
    Then I should see the following on engineer quote page details tab
      | FIELD        | CONDITION    | VALUE |
      | Status       | IS_EQUAL     | Paid  |
      | Subscription | IS_POPULATED |       |
#      | Job          | IS_POPULATED |       |
      | Contact      | IS_POPULATED |       |
    @EngQuote @EngQuoteNonInstallday
    Examples:
      | Profile | Quote Type  | Price      | Total Price | Quote Date | Expiry Date | Job Time |
      | CSA     | Non-Install | GBP 7.42  | GBP 7.42   | Today      | Today + 28  | 0        |
