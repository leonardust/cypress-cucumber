/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LoginPage from '../page_objects/LoginPage'

const loginPage = new LoginPage()
let stub

Given(`I navigate to the webdriveruniversity login page`, () => {
  loginPage.navigateToLoginPage()
})

When(`I type username {word} and password {string}`, (username, password) => {
  loginPage.typeCredentials(username, password)
})

When(`I click on the login button`, () => {
  stub = cy.stub()
  cy.on('window:alert', stub)
  loginPage.clickOnLoginButton()
})

Then(
  `I should be presented with an alert box which contains text {string}`,
  (expectedAlertText) => {
    expect(stub).to.have.been.calledWith(expectedAlertText)
  }
)
