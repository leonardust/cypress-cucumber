/// <reference types="cypress" />

import BasePage from './BasePage'

class ContactUsPage extends BasePage {
  elements = {
    firstNameInput: () => cy.get('[name="first_name"]'),
    lastNameInput: () => cy.get('[name="last_name"]'),
    emailInput: () => cy.get('[name="email"]'),
    commentInput: () => cy.get('textarea.feedback-input'),
    submitButton: () => cy.get('[type="submit"]'),
    submissionHeaderText: () => cy.xpath('//h1 | //body'),
  }

  navigateToContactUsPage() {
    super.navigate('/Contact-Us/contactus.html')
  }

  typeFirstName(firstName) {
    this.elements.firstNameInput().type(firstName)
  }

  typeLastName(lastName) {
    this.elements
      .lastNameInput()
      .type(lastName)
      .then(function (lastNameInput) {
        cy.log(
          'Enter ' +
            lastName +
            ' into element ' +
            lastNameInput.attr('placeholder')
        )
      })
  }

  typeEmail(email) {
    this.elements.emailInput().type(email)
  }

  typeComment(comment) {
    this.elements.commentInput().type(comment)
  }

  clickSubmitButton() {
    this.elements.submitButton().click()
  }

  getSubmissionHeaderText() {
    return this.elements.submissionHeaderText()
  }
}

export default ContactUsPage
