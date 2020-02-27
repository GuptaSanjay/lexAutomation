Feature: As a CSA I go to an existing customer account
And I am using different voucher codes to get appropriate discount

  @voucherBYO
  Scenario Outline: Validate the <Voucher> voucher code is calculating correct discount for BYO rate plan in <Source Country>
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I navigate to existing customer account page with <Rate Plan> and prefix ""
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    And I apply voucher <Voucher> code
    When I convert rate plan in BYO
    Then I should see the voucher discount is applied
    @VoucherBYOUK
    Examples:
      | Source Country | Rate Plan        | Voucher              |
      | GBR            | BYO-DELIVERY-GBR | UNIVERSAL_FIXED      |
      | GBR            | BYO-DELIVERY-GBR | UNIVERSAL_PERCENTAGE |
    @VoucherBYOIRL
    Examples:
      | Source Country | Rate Plan        | Voucher              |
      | IRL            | BYO-DELIVERY-IRL | UNIVERSAL_FIXED      |
      | IRL            | BYO-DELIVERY-IRL | UNIVERSAL_PERCENTAGE |

  @voucherOneTime
  Scenario Outline: Validate the <Voucher> voucher code is calculating correct discount for one time delivery/install rate plan in <Source Country>
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I navigate to existing customer account page with <Rate Plan> and prefix ""
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    And I apply voucher <Voucher> code
    Then I should see the voucher discount is applied
    @VoucherOneTimeUK
    Examples:
      | Source Country | Rate Plan            | Voucher              |
      | GBR            | ONETIME-DELIVERY-GBR | ONETIME_FIXED        |
      | GBR            | ONETIME-DELIVERY-GBR | ONETIME_PERCENTAGE   |
      | GBR            | ONETIME-DELIVERY-GBR | UNIVERSAL_PERCENTAGE |
      | GBR            | ONETIME-DELIVERY-GBR | UNIVERSAL_FIXED      |
      | GBR            | ONETIME-INSTALL-GBR  | ONETIME_FIXED        |
      | GBR            | ONETIME-INSTALL-GBR  | ONETIME_PERCENTAGE   |
      | GBR            | ONETIME-INSTALL-GBR  | UNIVERSAL_PERCENTAGE |
      | GBR            | ONETIME-INSTALL-GBR  | UNIVERSAL_FIXED      |
    @VoucherOneTimeIRL
    Examples:
      | Source Country | Rate Plan            | Voucher              |
      | IRL            | ONETIME-DELIVERY-IRL | ONETIME_FIXED        |
      | IRL            | ONETIME-DELIVERY-IRL | ONETIME_PERCENTAGE   |
      | IRL            | ONETIME-DELIVERY-IRL | UNIVERSAL_PERCENTAGE |
      | IRL            | ONETIME-DELIVERY-IRL | UNIVERSAL_FIXED      |
      | IRL            | ONETIME-INSTALL-IRL  | ONETIME_FIXED        |
      | IRL            | ONETIME-INSTALL-IRL  | ONETIME_PERCENTAGE   |
      | IRL            | ONETIME-INSTALL-IRL  | UNIVERSAL_PERCENTAGE |
      | IRL            | ONETIME-INSTALL-IRL  | UNIVERSAL_FIXED      |


  @voucherRecurring
  Scenario Outline: Validate the <Voucher> voucher code is calculating correct discount for recurring rate plan in <Source Country>
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan HIVELIVE-<Source Country>
    When I navigate to existing customer account page with <Rate Plan> and prefix ""
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    And I apply voucher <Voucher> code
    Then I should see the voucher discount is applied
    @VoucherRecurringUK
    Examples:
      | Source Country | Rate Plan            | Voucher              |
      | GBR            | ONETIME-DELIVERY-GBR | RECURRING_FIXED      |
      | GBR            | ONETIME-DELIVERY-GBR | RECURRING_PERCENTAGE |
      | GBR            | ONETIME-DELIVERY-GBR | UNIVERSAL_PERCENTAGE |
      | GBR            | ONETIME-DELIVERY-GBR | UNIVERSAL_FIXED      |
    @VoucherRecurringIRL
    Examples:
      | Source Country | Rate Plan            | Voucher              |
      | IRL            | ONETIME-DELIVERY-IRL | RECURRING_FIXED      |
      | IRL            | ONETIME-DELIVERY-IRL | RECURRING_PERCENTAGE |
      | IRL            | ONETIME-DELIVERY-IRL | UNIVERSAL_PERCENTAGE |
      | IRL            | ONETIME-DELIVERY-IRL | UNIVERSAL_FIXED      |
