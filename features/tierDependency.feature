@tierDependency
Feature: Dependency rate plans are added when I add a Hive video playback tier rate plan

  Scenario Outline: Validate dependency rate plans are added for Hive video playback tier rate plan (Monthly and Yearly)
    Given I am logged in as csa on Salesforce for <Source Country>
    When I create a new customer account with prefix "Tier Dependency"
    Then I validate account type is Prospect
    When I start a new zquote for new customer
    And I select a product with <Tier1> rate plan
    Then I validate following products are added <Tier1 List>
    When I go back to product selection page
    And I select a product with <Tier2> rate plan
    Then I validate following products are added <Tier2 List>
    When I go back to product selection page
    And I select a product with <Tier3> rate plan
    Then I validate following products are added <Tier3 List>
    @tierDependencyGBR @tierDependencyMonthlyGBR
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | GBR            | TIER1-GBR-Monthly | TIER2-GBR-Monthly | TIER3-GBR-Monthly | SUB00405   | SUB00405,SUB00406 | SUB00405,SUB00406,SUB00407 |
    @tierDependencyMonthlyUSA
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | USA            | TIER1-USA-Monthly | TIER2-USA-Monthly | TIER3-USA-Monthly | SUB00457   | SUB00458,SUB00457 | SUB00459,SUB00458,SUB00457 |
    @tierDependencyMonthlyCAN
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | CAN            | TIER1-CAN-Monthly | TIER2-CAN-Monthly | TIER3-CAN-Monthly | SUB00472   | SUB00473,SUB00472 | SUB00474,SUB00473,SUB00472 |
    @tierDependencyIRL @tierDependencyMonthlyIRL
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | IRL            | TIER1-IRL-Monthly | TIER2-IRL-Monthly | TIER3-IRL-Monthly | SUB00409   | SUB00410,SUB00409 | SUB00411,SUB00410,SUB00409 |
    @tierDependencyITA @tierDependencyMonthlyITA
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | ITA            | TIER3-ITA-Monthly | TIER3-ITA-Monthly | TIER3-ITA-Monthly | SUB00425   | SUB00426,SUB00425 | SUB00427,SUB00426,SUB00425 |
    @tierDependencyFRA @tierDependencyMonthlyFRA
    Examples:
      | Source Country | Tier1             | Tier2             | Tier3             | Tier1 List | Tier2 List        | Tier3 List                 |
      | FRA            | TIER3-FRA-Monthly | TIER3-FRA-Monthly | TIER3-FRA-Monthly | SUB00441   | SUB00442,SUB00441 | SUB00443,SUB00442,SUB00441 |
    @tierDependencyGBR @tierDependencyYearlyGBR
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | GBR            | TIER1-GBR-Yearly | TIER2-GBR-Yearly | TIER3-GBR-Yearly | SUB00402   | SUB00403,SUB00402 | SUB00404,SUB00403,SUB00402 |
    @tierDependencyYearlyUSA
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | USA            | TIER1-USA-Yearly | TIER2-USA-Yearly | TIER3-USA-Yearly | SUB00466   | SUB00467,SUB00466 | SUB00468,SUB00467,SUB00466 |
    @tierDependencyYearlyCAN
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | CAN            | TIER1-CAN-Yearly | TIER2-CAN-Yearly | TIER3-CAN-Yearly | SUB00481   | SUB00482,SUB00481 | SUB00483,SUB00482,SUB00481 |
    @tierDependencyIRL @tierDependencyYearlyIRL
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | IRL            | TIER1-IRL-Yearly | TIER2-IRL-Yearly | TIER3-IRL-Yearly | SUB00418   | SUB00419,SUB00418 | SUB00420,SUB00419,SUB00418 |
    @tierDependencyITA @tierDependencyYearlyITA
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | ITA            | TIER1-ITA-Yearly | TIER2-ITA-Yearly | TIER3-ITA-Yearly | SUB00434   | SUB00435,SUB00434 | SUB00436,SUB00435,SUB00434 |
    @tierDependencyFRA @tierDependencyYearlyFRA
    Examples:
      | Source Country | Tier1            | Tier2            | Tier3            | Tier1 List | Tier2 List        | Tier3 List                 |
      | FRA            | TIER1-FRA-Yearly | TIER2-FRA-Yearly | TIER3-FRA-Yearly | SUB00450   | SUB00451,SUB00450 | SUB00452,SUB00451,SUB00450 |

