describe('search products', () => {
  it('should be able to search for products', () => {
    // cy.visit('/')
    // cy.get('input[name=q]').type('moletom').parent('form').submit()
    cy.searchByQuery('moletom') // usando o meu próprio comando criado
    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to visit search page without a search query', () => {
    // Em caso de exceção, não realizar nenhum erro
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
