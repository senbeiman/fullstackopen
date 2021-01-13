describe('Note app', function() {
  beforeEach(function() {
    cy.intercept({
      url: 'http://localhost:3000/api/users',
      method: 'GET'
    }).as('users')
    cy.intercept({
      url: 'http://localhost:3000/api/blogs',
      method: 'GET'
    }).as('blogs')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Akiko',
      username: 'senbeiman',
      password: '1000bei'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
    cy.wait('@users')
    cy.wait('@blogs')
  })
  describe('Login', function() {
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })
    it('user can log in', function() {
      cy.get('#username').type('senbeiman')
      cy.get('#password').type('1000bei')
      cy.get('#login-button').click()

      cy.contains('Akiko logged in')
    })
    it('login fails with wrong password', function() {
      cy.get('#username').type('senbeiman')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
        .and('have.css', 'color', 'rgb(97, 26, 21)')
      cy.get('html').should('not.contain', 'Akiko logged in')
    })
  })
  describe('when logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'senbeiman', password: '1000bei' })
    })
    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
    })
    describe('and a blog exists', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'new title cypress',
          author: 'new author cypress',
          url: 'new url cypress'
        })
        cy.visit('http://localhost:3000')
        cy.wait('@users')
        cy.wait('@blogs')
      })
      it('user can like a blog', function() {
        cy.contains('new title cypress').click()
        cy.get('#like-button').click()

        cy.contains('1 likes')
      })
      it('user can delete a blog', function() {
        cy.contains('new title cypress').click()
        cy.get('#remove-button').click()

        cy.visit('http://localhost:3000')
        cy.wait('@users')
        cy.wait('@blogs')
        cy.get('.blog-list').should('not.contain', 'new title cypress')
      })
      it('other user cannot delete a blog', function() {
        const user = {
          name: 'Other',
          username: 'someone',
          password: 'pass'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.contains('logout').click()
        cy.login({ username: 'someone', password: 'pass' })
        cy.contains('new title cypress').click()
        cy.get('#remove-button').click()
        cy.visit('http://localhost:3000')
        cy.wait('@users')
        cy.wait('@blogs')
        cy.get('.blog-list').contains('new title cypress')
      })
    })
    it('blogs are ordered according to likes', function() {
      cy.createBlog({
        title: 'first',
        author: 'someone',
        url: 'url'
      }).then(({ body: firstBody }) => {
        cy.createBlog({
          title: 'second',
          author: 'someone',
          url: 'url'
        }).then(({ body: secondBody }) => {
          cy.visit('http://localhost:3000')
          cy.wait('@users')
          cy.wait('@blogs')
          cy.get('.blog-list').find('a')
            .then(elms => {
              cy.wrap(elms[0]).contains('first')
              cy.wrap(elms[1]).contains('second')
            })
          cy.likeBlog(firstBody, 1)
          cy.likeBlog(secondBody, 2)
          cy.visit('http://localhost:3000')
          cy.wait('@users')
          cy.wait('@blogs')
          cy.get('.blog-list').find('a')
            .then(elms => {
              cy.wrap(elms[0]).contains('second')
              cy.wrap(elms[1]).contains('first')
            })
        })
      })
    })
  })
})