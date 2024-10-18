it('testa a página da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})

it('testa a página da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html')
    // cy.get('body').should('not.be.empty')
    cy.get('body').invoke('text').then((text) => {
        cy.log(text) // Mostra o texto no log do Cypress
        console.log(text) // Imprime o texto no console do navegador
    })
})

Cypress._.times(3, function() {
    it.only('visitar a página mais de uma vez', function() {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })

})