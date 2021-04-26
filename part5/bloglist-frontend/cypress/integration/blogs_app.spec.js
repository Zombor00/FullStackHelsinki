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
      cy.get('html').should('not.contain', 'Alex logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'alex_bravo', password: 'patata' })
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
        cy.createBlog({ title: 'Blog 0', author: 'Alex', url: 'www.blog0.com', likes: 0 })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('Blog 0')
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.notif').contains('The blog Blog 0 by Alex has been deleted')
      })

      describe('When logged in and with four blog', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'Blog 1', author: 'Alex', url: 'www.blog1.com', likes: 5 })
          cy.createBlog({ title: 'Blog 2', author: 'Alex', url: 'www.blog2.com', likes: 25 })
          cy.createBlog({ title: 'Blog 3', author: 'Alex', url: 'www.blog3.com', likes: 3 })
        })

        it('Blogs are sorted by number of likes', function() {
          cy.get('.blogFull').eq(0).contains('likes 25')
          cy.get('.blogFull').eq(1).contains('likes 5')
          cy.get('.blogFull').eq(2).contains('likes 3')
          cy.get('.blogFull').eq(3).contains('likes 0')
        })
      })
    })
  })
})