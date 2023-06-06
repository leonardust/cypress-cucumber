describe('Verifying variables, cypress commands and jqueary commands', () => {
  it('Navigation to the specific product pages', () => {
    // not recommended
    cy.visit('https://www.automationteststore.com/')
    const makeUpLink = cy
      .get("a[href*='product/category&path=']")
      .contains('Makeup')
    const skinCareLink = cy
      .get("a[href*='product/category&path=']")
      .contains('Skincare')
    makeUpLink.click()
    skinCareLink.click()

    cy.visit('https://www.automationteststore.com/')
    const makeUpLink1 = cy
      .get("a[href*='product/category&path=']")
      .contains('Makeup')
    makeUpLink1.click()
    const skinCareLink1 = cy
      .get("a[href*='product/category&path=']")
      .contains('Skincare')
    skinCareLink1.click()

    // recommended
    cy.get("a[href*='product/category&path=']").contains('Makeup').click()
    cy.get("a[href*='product/category&path=']").contains('Skincare').click()
  })

  it('Navigation to the specific product pages', () => {
    cy.visit('https://www.automationteststore.com/')
    cy.get("a[href*='product/category&path=']").contains('Makeup').click()

    cy.get('h1 .maintext').then(($headerText) => {
      //const headerText = $headerText.text()
      //cy.log('Found header text: ' + headerText)
      expect($headerText.text()).is.eq('Makeup')
    })
  })

  it('Navigation to the specific product pages', () => {
    cy.visit('https://automationteststore.com/index.php?rt=content/contact')

    //Cypress commands and chaining
    cy.contains('#ContactUsFrm', 'Contact Us Form')
      .find('#field_11')
      .should('contain', 'First name')

    //JQuery Approach
    cy.contains('#ContactUsFrm', 'Contact Us Form').then((text) => {
      const firstNameText = text.find('#field_11').text()
      expect(firstNameText).to.contain('First name')

      //Embedded commands (Closure)
      cy.get('#field_11').then((fnText) => {
        cy.log(fnText.text())
        cy.log(fnText)
      })
    })

    //Embedded commands
  })
})
