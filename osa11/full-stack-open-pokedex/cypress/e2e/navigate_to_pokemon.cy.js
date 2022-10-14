describe('Pokedex', function() {
  it('pokemon page can be navigated to', function() {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')

    cy.contains('blastoise').click()
    cy.contains('blastoise')
    cy.url().should('include', '/pokemon/blastoise')

    cy.contains('torrent')
    cy.contains('rain dish')
  })
})