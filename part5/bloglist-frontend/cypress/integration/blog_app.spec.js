/* eslint-disable no-undef */
describe('Blog app', function() {
	beforeEach(function() {
	  cy.request('POST', 'http://localhost:3001/api/testing/reset')
	  const user = {
		name: 'hey my name is poke',
		username: 'iamuser',
		password: 'password'
	  }
	  cy.request('POST', 'http://localhost:3001/api/users', user)
	  cy.visit('http://localhost:3000')
	})
  
	it('Login form is shown', function() {
		cy.contains('Username')
		cy.contains('Password')
		cy.contains('Login')
	})

	it('succeeds with correct credentials', function() {
		cy.get('#username').type('iamuser')
		cy.get('#password').type('password')
		cy.get('#loginButton').click()

		cy.contains('Logout')
		cy.contains('create blog')
	})

	it('fails with wrong credentials', function() {
		cy.get('#username').type('iamuser')
		cy.get('#password').type('badpassword')

		cy.on('window:alert', (str) => {
			expect(str).to.equal('Wrong credentials')
		})
	})
})

describe('When logged in', function() {
	beforeEach(function() {
		cy.login({username: 'iamuser', password: 'password'})
	})

	it('can create new blog', function() {
		cy.get('#toggleToggableButton').click()

		cy.get('#title').type('i am a blog, read me')
		cy.get('#author').type('i am an author, respect me')
		cy.get('#url').type('https://iamaurlclickme')
		cy.get('#submitBlogButton').click()

		cy.contains('i am a blog, read me')
	})

	describe('When a user adds a blog', function() {

		it('user can like the blog', function() {
			cy.get('#detailsButton').click()
			cy.get('#likeButton').click()

			cy.contains('likes: 1')
		})

		it('user can delete the blog', function() {
			cy.get('#detailsButton').click()
			cy.get('#removeBlogButton').click()

			cy.on('window:confirm', (str) => {
				expect(str).to.equal('Remove blog: i am a blog, read me')
				return true
			})

			cy.contains('i am a blog, read me').should('not.exist');
		})
	})
})