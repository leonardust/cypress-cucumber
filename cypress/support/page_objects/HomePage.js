/// <reference types="cypress" />

import BasePage from './BasePage'

class HomePage extends BasePage {
  navigateToHomePage() {
    super.navigate('')
  }

  clickOnContactUsLink() {
    cy.clickAndOpenLinkInSameTab('#contact-us')
  }

  clickOnLoginPortalLink() {
    cy.clickAndOpenLinkInSameTab('#login-portal')
  }
}

export default HomePage
