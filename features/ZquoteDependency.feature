Feature: As a CSA I create a new customer account
And check the dependency rule is working

  Scenario Outline: I validate that duplicate hive live dependency rule is working for <Source Country>
    Given I am logged in as csa on Salesforce for <Source Country>
    And I have a rate plan <Rate Plan>
    When I navigate to existing customer account page with <Rate Plan> and prefix "HIVELIVE_"
    When I start a new zquote for existing customer
    And I select a product with given rate plan
    Then I should see the warning message for duplicate Hive Live based on <Source Country>
    @HiveLiveDependencyUK
    Examples:
      | Source Country | Rate Plan    |
      | GBR            | HIVELIVE-GBR |
    @HiveLiveDependencyIreland
    Examples:
      | Source Country | Rate Plan    |
      | IRL            | HIVELIVE-IRL |
