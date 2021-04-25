describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'alex_bravo',
      name: 'Alex',
      password: 'patata'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alex_bravo')
      cy.get('#password').type('patata')
      cy.get('#login-button').click()

      cy.contains('Alex logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('alex_bravo')
      cy.get('#password').type('puerro')
      cy.get('#login-button').click()

      cy.contains('Login')
    })
  })

})