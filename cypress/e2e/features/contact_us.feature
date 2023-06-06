@contact-us @regression
Feature: WebdriverUniversity - Contact Us Page

Background: I am on the contact page

Given I navigate to the webdriveruniversity home page
When  I click on the contact us link

Scenario: Valid Contact us Form Submission

And  I type a first name
And   I type a last name
And   I type an email address
And   I type a comment
And   I click on the submit button
Then  I should be presented with successful contact us submission message

Scenario: Invalid Contact us Form Submission

And   I type a first name
And   I type a last name
And   I type a comment
And   I click on the submit button
Then  I should be presented with unsuccessful contact us submission message

Scenario: Valid Contact us Form Submission - Using specific data

And   I type a specific first name "Sarah"
And   I type a specific last name "Woods"
And   I type a specific email address "sarah_woods101@mail.com"
And   I type a specific word "hello123" and number 6788 within the comment input field
And   I click on the submit button
Then  I should be presented with successful contact us submission message

@smoke
Scenario Outline: Validate contact us page

And   I type firstname <firstName> and lastname '<lastName>'
And   I type email <emailAddress> and comment '<comment>'
And   I click on the submit button
Then  I should be presented with header text '<message>'

Examples:
    | firstName | lastName | emailAddress        | comment     | message                      |
    | John      | Jones    | john_jones@mail.com | Hello World | Thank You for your Message!555  |
    | Mia       | Jones    | mia_jones@mail.com  | Hello World | Thank You for your Message!  |
    | Grace     | Jones    | grace_jones         | Hello World | Error: Invalid email address |
