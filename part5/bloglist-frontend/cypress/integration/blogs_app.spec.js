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

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('alex_bravo')
      cy.get('#password').type('patata')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog 0')
      cy.get('#author').type('Alex')
      cy.get('#url').type('www.blog0.com')
      cy.get('#create-button').click()
      
      cy.contains('Blog 0 Alex')
    })

    describe('When logged in and with a blog', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Blog 0')
        cy.get('#author').type('Alex')
        cy.get('#url').type('www.blog0.com')
        cy.get('#create-button').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        
        cy.contains('likes 1')
      })
    }) 
  })
})