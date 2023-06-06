/// <reference types="cypress" />

import BasePage from './BasePage'

class LoginPage extends BasePage {
  navigateToLoginPage() {
    super.navigate('/Login-Portal/index.html')
  }

  typeCredentials(username, password) {
    cy.get('#text').type(username)
    cy.get('#password').type(password)
  }

  clickOnLoginButton() {
    cy.get('#login-button').click()
  }
}

export default LoginPage
