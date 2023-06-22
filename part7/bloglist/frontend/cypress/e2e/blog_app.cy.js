describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user1 = {
      name: 'cypress',
      username: 'cypress',
      password: 'cypress',
    }

    const user2 = {
      name: 'dummy',
      username: 'dummy',
      password: 'dummy',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('login form is shown', function () {
    cy.contains('login').click()
    cy.get('.login_username').should('be.visible')
    cy.get('.login_password').should('be.visible')
    cy.get('.login_btn').should('be.visible')
  })

  describe('user login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('.login_username').type('cypress')
      cy.get('.login_password').type('cypress')
      cy.get('.login_btn').click()

      cy.contains('cypress logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.contains('login').click()
      cy.get('.login_username').type('cypress')
      cy.get('.login_password').type('wrong')
      cy.get('.login_btn').click()

      cy.get('.error').should('contain', 'invalid username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'cypress' })
    })

    it('a new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('.blog_title_input').type('Antic Hay')
      cy.get('.blog_author_input').type('Aldous Huxley')
      cy.get('.blog_url_input').type('https://en.wikipedia.org/wiki/Antic_Hay')

      cy.get('.blog_submit_btn').click()

      cy.contains('a new blog Antic Hay by Aldous Huxley added')
      cy.contains('Antic Hay')
    })

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Antic Hay', author: 'Aldous Huxley', url: 'https://en.wikipedia.org/wiki/Antic_Hay' })
      })

      it('user can like a blog', function () {
        cy.contains('show').click()
        cy.get('.blog_likes_btn').click()
        cy.get('.blog_likes_count').should('contain', 1)
      })

      it('only creator is able to see the remove button', function () {
        cy.contains('show').click()
        cy.get('.blog_remove_btn').should('be.visible')

        cy.login({ username: 'dummy', password: 'dummy' })
        cy.contains('show').click()
        cy.get('.blog_remove_btn').should('not.be.visible')
      })

      it('creator is able to remove the blog', function () {
        cy.contains('show').click()
        cy.get('.blog_remove_btn').click()

        cy.contains('Antic Hay').should('not.exist')
      })
    })

    describe('blogs are ordering', function () {
      beforeEach(function () {
        cy.login({ username: 'cypress', password: 'cypress' })

        cy.createBlog({ title: 'First blog', author: 'John Doe', url: 'www.example.com', likes: 20 })
        cy.createBlog({ title: 'Second blog', author: 'John Doe', url: 'www.example.com', likes: 21 })
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.blog-wrapper').eq(0).should('contain', 'Second blog')
        cy.get('.blog-wrapper').eq(1).should('contain', 'First blog')

        cy.contains('First blog').parent().find('.blog_visibility_btn').click()
        cy.contains('First blog').parent().find('.blog_likes_btn').click()
        cy.contains('First blog').parent().find('.blog_likes_btn').click()

        cy.get('.blog-wrapper').eq(0).should('contain', 'First blog')
        cy.get('.blog-wrapper').eq(1).should('contain', 'Second blog')
      })
    })
  })
})
