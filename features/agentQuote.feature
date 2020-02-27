Feature: As a CSA I create an Engineer Quote

  Scenario Outline: Create an <Quote Type> quote
    Given I am on General help page on web for UK
    And I am logged in as csa on Salesforce for GBR
    When I create a new Address
    And I create a new Agent Quote
    And I create a new <Quote Type> engineer quote line item
    Then I should see the following on engineer quote page related tab
      | FIELD       | CONDITION | VALUE         |
      | Quantity    | IS_EQUAL  | 1             |
      | Price       | IS_EQUAL  | <Price>       |
      | Total Price | IS_EQUAL  | <Total Price> |
      | Job Time    | IS_EQUAL  | <Job Time>    |
    Then I should see the following on engineer quote page details tab
      | FIELD               | CONDITION | VALUE                 |
      | Status              | IS_EQUAL  | Open                  |
      | Record Type         | CONTAINS  | Agent Quote           |
#      | Quote Date          | CONTAINS | <Quote Date>          |
#      | Expiry Date         | CONTAINS | <Expiry Date>         |
      | In Day Products     | IS_EQUAL  | <In-Day Products> |
      | Future Day Products | IS_EQUAL  | <Future-Day Products> |
      | Delivery Products   | IS_EQUAL  | <Delivery Products>   |
    When I complete <Quote Type> sales over the phone
    And I go back to engineer quote page
    And I wait and refresh engineer quote page for Status to be Paid
    Then I should see the following on engineer quote page details tab
      | FIELD        | CONDITION    | VALUE |
      | Status       | IS_EQUAL     | Paid  |
      | Subscription | IS_POPULATED |       |
#      | Job          | IS_POPULATED |      |
      | Contact      | IS_POPULATED |       |
    @AgentQuote @AgenQuoteDelivery
    Examples:
      | Quote Type | Price     | Total Price | Quote Date | Expiry Date | Job Time | In-Day Products | Future-Day Products | Delivery Products |
      | Delivery   | GBP 10.75 | GBP 10.75   | Today      | Today + 28  | 0        | 0               | 0                   | 1                 |
    @AgentQuote @AgenQuoteInstall
    Examples:
      | Quote Type | Price      | Total Price | Quote Date | Expiry Date | Job Time | In-Day Products | Future-Day Products | Delivery Products |
      | Install    | GBP 249.00 | GBP 249.00  | Today      | Today + 28  | 90       | 0              | 1                   | 0                 |

