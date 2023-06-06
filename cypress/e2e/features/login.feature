@login @regression
Feature: WebdriverUniversity - Login Page

Background: I am on the login page

When  I wait for 0 seconds

Scenario Outline: Validate valid & invalid credentials

Given I navigate to the webdriveruniversity login page
And   I type username <username> and password '<password>'
And   I click on the login button
Then  I should be presented with an alert box which contains text '<expectedAlertText>'

Examples:
    | username  | password     | expectedAlertText    |
    | webdriver | webdriver123 | validation succeeded555 |
    | webdriver | webdriver321 | validation failed    |
    | webdriver | webdriver321 | validation failed    |
