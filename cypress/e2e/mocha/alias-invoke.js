/// <reference types="Cypress" />

describe('Alias and invoke', () => {
  it('Validate a specific hair care product', () => {
    cy.visit('https://www.automationteststore.com/')
    cy.get("a[href*='product/category&path=']").contains('Hair Care').click()

    cy.get('.fixed_wrapper .prdocutname')
      .eq(0)
      .invoke('text')
      .as('productThumbnail')

    cy.get('@productThumbnail').its('length').should('be.gt', 5)
    cy.get('@productThumbnail').should('include', 'Seaweed Conditioner')
  })

  it('Validate a products length on Home page', () => {
    cy.visit('https://www.automationteststore.com/')
    cy.get('.thumbnails .thumbnail').as('productThumbnail')
    cy.get('@productThumbnail').its('length').should('eq', 16)
    cy.get('@productThumbnail')
      .find('.productcart')
      .invoke('attr', 'title')
      .should('include', 'Add to Cart')
  })

  it.only('Calculate total of normal and sale products', () => {
    cy.visit('https://www.automationteststore.com/')
    cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemsPrice')
    cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemsPrice')

    let itemsTotal = 0

    cy.get('@itemsPrice').then(($linkText) => {
      let itemsPriceTotal = 0
      let itemPrice = $linkText.split('$')
      let i
      for (i = 0; i < itemPrice.length; i++) {
        cy.log('Item price to add: ' + itemPrice[i])
        itemsPriceTotal += Number(itemPrice[i])
        cy.log('Current sum: ' + itemsPriceTotal)
      }
      itemsTotal += itemsPriceTotal
      cy.log('Non sell price items total: ' + itemsPriceTotal)
    })

    // cy.get('@saleItemsPrice')
    //   .then(($linkText) => {
    //     let saleItemPrice = $linkText.split('$')
    //     let saleItemsPriceTotal = 0

    //     cy.wrap(saleItemPrice)
    //       .each((price) => {
    //         cy.log('Item price to add: ' + price)
    //         saleItemsPriceTotal += Number(price)
    //         cy.log('Current sum: ' + saleItemsPriceTotal)
    //       })
    //       .then(() => {
    //         itemsTotal += saleItemsPriceTotal
    //         cy.log('Sell price items total: ' + saleItemsPriceTotal)
    //       })
    //   })
    //   .then(() => {
    //     cy.log('Sell and non sell price items total: ' + itemsTotal)
    //     expect(itemsTotal).to.equal(639.49)
    //   })

    cy.get('@saleItemsPrice')
      .then(($linkText) => {
        const saleItemsPrice = $linkText.split('$')
        const saleItemsPriceTotal = saleItemsPrice.reduce((total, price) => {
          cy.log('Item price to add: ' + price)
          const priceNum = Number(price)
          cy.log('Current sum: ' + (total + priceNum))
          return total + priceNum
        }, 0)

        itemsTotal += saleItemsPriceTotal
        cy.log('Sell price items total: ' + saleItemsPriceTotal)
        cy.log('Sell and non sell price items total: ' + itemsTotal)
      })
      .then(() => {
        cy.log('Sell and non sell price items total: ' + itemsTotal)
        expect(itemsTotal).to.equal(639.49)
      })
  })
})
