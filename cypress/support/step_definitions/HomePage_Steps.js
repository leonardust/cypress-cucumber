/// <reference types="cypress" />
import { Given, When } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../page_objects/HomePage'

const homePage = new HomePage()

Given(`I navigate to the webdriveruniversity home page`, () => {
  homePage.navigate('')
})

When(`I click on the contact us link`, () => {
  homePage.clickOnContactUsLink()
})

When(`I click on the login portal link`, () => {
  homePage.clickOnLoginPortalLink()
})
