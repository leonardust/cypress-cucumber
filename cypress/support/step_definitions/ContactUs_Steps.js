/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import ContactUsPage from '../page_objects/ContactUsPage'

const contactUsPage = new ContactUsPage()

When(`I type a first name`, () => {
  contactUsPage.typeFirstName('Jon')
})

When(`I type a last name`, () => {
  contactUsPage.typeLastName('Doe')
})

When(`I type an email address`, () => {
  contactUsPage.typeEmail('JoeDoe1234@mail.com')
})

When(`I type a comment`, () => {
  contactUsPage.typeComment('Some Comment')
})

When(`I click on the submit button`, () => {
  contactUsPage.clickSubmitButton()
})

Then(
  `I should be presented with successful contact us submission message`,
  () => {
    contactUsPage
      .getSubmissionHeaderText()
      .contains('Thank You for your Message!')
  }
)

Then(
  `I should be presented with unsuccessful contact us submission message`,
  () => {
    contactUsPage
      .getSubmissionHeaderText()
      .contains('Error: Invalid email address')
  }
)

When(`I type a specific first name {string}`, (firstName) => {
  contactUsPage.typeFirstName(firstName)
})

When(`I type a specific last name {string}`, (lastName) => {
  contactUsPage.typeLastName(lastName)
})

When(`I type a specific email address {string}`, (email) => {
  contactUsPage.typeEmail(email)
})

When(
  `I type a specific word {string} and number {int} within the comment input field`,
  (word, number) => {
    contactUsPage.typeComment(word + number)
  }
)

When(`I type firstname {word} and lastname {string}`, (firstName, lastName) => {
  contactUsPage.typeFirstName(firstName)
  contactUsPage.typeLastName(lastName)
})

When(`I type email {word} and comment {string}`, (email, comment) => {
  contactUsPage.typeEmail(email)
  contactUsPage.typeComment(comment)
})

Then(`I should be presented with header text {string}`, (expectedText) => {
  contactUsPage.getSubmissionHeaderText().contains(expectedText)
})
