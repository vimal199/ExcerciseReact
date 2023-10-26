describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      userName: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('userName')
    cy.contains('password')
    cy.contains('Log in')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('Log in').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with correct credentials', function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('wrong')
      cy.contains('Log in').click()
      cy.contains('invalid username or password')
        .should('have.class', 'error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(
      function () {
        cy.get('input:first').type('mluukkai')
        cy.get('input:last').type('salainen')
        cy.contains('Log in').click()
      })
    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('first')
      cy.get('#author').type('first')
      cy.get('#url').type('first')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('first' + ' ' + 'first')
      //  cy.contains('author')
    })
    it('User can like a blog', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('second')
      cy.get('#author').type('second')
      cy.get('#url').type('second')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('second' + ' ' + 'second').find('input:first').click()
      //  cy.contains('Matti Luukkainen')
      cy.contains('second' + ' ' + 'second').find('#like').click()
    })
    it('ensuring that the user who created a blog can delete it', function () {


      cy.contains('create new blog').click()
      cy.get('#title').type('second')
      cy.get('#author').type('second')
      cy.get('#url').type('second')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('second' + ' ' + 'second').find('input:first').click()
      cy.contains('Matti Luukkainen')
      cy.contains('second' + ' ' + 'second').find('.deleteBlog').click()
    })
    it('ensuring that only the creator can see the delete button of a blog, not anyone else.', function () {
      const user1 = {
        name: 'Matti Luukkainen123',
        userName: 'mluukkai123',
        password: 'salainen123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user1)

      cy.contains('create new blog').click()
      cy.get('#title').type('second')
      cy.get('#author').type('second')
      cy.get('#url').type('second')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('second' + ' ' + 'second').find('input:first').click()
      cy.contains('second' + ' ' + 'second').find('.deleteBlog').should('be.visible')
      cy.get('#logout').click()
      cy.get('input:first').type('mluukkai123')
      cy.get('input:last').type('salainen123')
      cy.contains('Log in').click()
      cy.contains('second' + ' ' + 'second').find('input:first').click()
      cy.contains('second' + ' ' + 'second').find('.deleteBlog').should('not.be.visible')
      // cy.contains('second' + ' ' + 'second').find('input:first').click()
      //  cy.contains('Matti Luukkainen')
      // cy.contains('second' + ' ' + 'second').find('.deleteBlog').click()
    })
    it('blogs are ordered according to likes with the blog with the most likes being first.', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('first')
      cy.get('#author').type('first')
      cy.get('#url').type('first')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('first' + ' ' + 'first').find('input:first').click()
      cy.contains('first' + ' ' + 'first').find('#like').click()
      cy.contains('first' + ' ' + 'first').find('#like').click()
      cy.contains('first' + ' ' + 'first').find('#like').click()
      cy.contains('first' + ' ' + 'first').find('#like').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('second')
      cy.get('#author').type('second')
      cy.get('#url').type('second')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('second' + ' ' + 'second').find('input:first').click()
      cy.contains('second' + ' ' + 'second').find('#like').click()
      cy.contains('second' + ' ' + 'second').find('#like').click()
      cy.contains('second' + ' ' + 'second').find('#like').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('third')
      cy.get('#author').type('third')
      cy.get('#url').type('third')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('third' + ' ' + 'third').find('input:first').click()
      cy.contains('third' + ' ' + 'third').find('#like').click()
      cy.contains('third' + ' ' + 'third').find('#like').click()
      cy.contains('third' + ' ' + 'third').find('#like').click()
      cy.contains('third' + ' ' + 'third').find('#like').click()
      cy.contains('third' + ' ' + 'third').find('#like').click()
      cy.get('#logout').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('Log in').click()
      cy.get('.blog').eq(0).find('.blogDetails').should('contain', 'likes 5')
      cy.get('.blog').eq(1).find('.blogDetails').should('contain', 'likes 4')
      cy.get('.blog').eq(2).find('.blogDetails').should('contain', 'likes 3')
      /* cy.contains('create new blog').click()
      cy.get('#title').type('first')
      cy.get('#author').type('first')
      cy.get('#url').type('first')
      cy.get('#bwcreate').click()
      cy.contains('a new blog')
      cy.contains('first' + ' ' + 'first').find('input:first').click() */
    })
  })
})