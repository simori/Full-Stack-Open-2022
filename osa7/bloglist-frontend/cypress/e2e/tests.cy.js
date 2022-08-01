describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Testaaja',
      username: 'ttest',
      password: 'testi322'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17 Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('5.18 Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ttest')
      cy.get('#password').type('testi322')
      cy.get('#login-button').click()
      //cy.login({ username: 'ttest', password: 'testi322' })
      cy.contains('Logged in as Teemu Testaaja!')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
      // vapaaehtoinen lisätehtävä
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.get('#username').clear()
    cy.get('#password').clear()
    cy.get('#username').type('ttest')
    cy.get('#password').type('testi322')
    cy.get('#login-button').click()

    cy.contains('Logged in as Teemu Testaaja!')
  })

  it('5.19 A blog can be created', function () {
    cy.get('#crate-button').click()
    cy.get('#blogTitle').type('Teemun TestiBlogi')
    cy.get('#blogAuthor').type('ttest')
    cy.get('#blogUrl').type('http://www.testa.us')
    /* const blog = {
      title: 'Teemun TestiBlogi',
      author: 'teme',
      url: 'http://www.testa.us'
    }
    cy.request('POST', 'http://localhost:3003/api/blogs/', blog) */
    cy.get('#createBlog').click()

    cy.contains('Teemun TestiBlogi ttest')
    cy.get('#logout').click()
  })

  describe('Blog added successfully:', function () {
    it('5.20 A blog can be liked', function () {
      cy.get('#viewBlog').click()
      cy.contains('0 likes')
      cy.get('#likeButton').click()
      cy.contains('1 likes')
      cy.get('#logout').click()
    })

    it('5.21 A blog can be removed by user who added it', function () {
      cy.get('#viewBlog').click()
      cy.get('#removeBlog').click()
      cy.contains('Teemun TestiBlogi ttest').should('not.exist')
      cy.get('#logout').click()
    })
  })

  describe('5.22', function () {
    beforeEach(function () {
      /* todo: koita sama mutta tee blogit commandssin kautta???
      laita blogi2:lle 3 tykkäystä ja sitte blogi3:lle 2 ja vikaks blogi1:lle 4
      */
      cy.get('#crate-button').click()
      cy.get('#blogTitle').type('Blogi1')
      cy.get('#blogAuthor').type('Teme Testeri')
      cy.get('#blogUrl').type('http://www.jonneweb.net')
      cy.get('#createBlog').click()

      cy.get('#crate-button').click()
      cy.get('#blogTitle').type('Blogi2')
      cy.get('#blogAuthor').type('Temf Testeri')
      cy.get('#blogUrl').type('http://www.markapie.ru')
      cy.get('#createBlog').click()

      cy.get('#crate-button').click()
      cy.get('#blogTitle').type('Blogi3')
      cy.get('#blogAuthor').type('Temg Testeri')
      cy.get('#blogUrl').type('http://www.pelaacsjajuo.es')
      cy.get('#createBlog').click()
    })

    it('Bloglist will be arranged so that most liked blog is first?', function () {
      cy.get('div.blog').eq(0).should('contain', 'Blogi1')
      cy.get('div.blog')
        .eq(1)
        .should('contain', 'Temf')
        .get('#viewBlog')
        .click()
        .wait(1000)
      // avataan blogit

      cy.get('div.blog>button').eq(1).get('#viewBlog').click()
      cy.get('div.blog>button').eq(2).get('#viewBlog').click()

      // aletaan klikkaamaan tykkäysnappeja!
      cy.contains('Blogi2').parent().find('#likeButton').click()
      cy.contains('Blogi2').parent().find('#likeButton').click()
      cy.contains('Blogi2').parent().find('#likeButton').click()

      cy.contains('Blogi1').parent().find('#likeButton').click()
      cy.contains('Blogi1').parent().find('#likeButton').click()

      cy.contains('Blogi3').parent().find('#likeButton').click()
      cy.contains('Blogi3').parent().find('#likeButton').click()
      cy.contains('Blogi3').parent().find('#likeButton').click()
      cy.contains('Blogi3').parent().find('#likeButton').click()

      // blogit pitäisi nyt olla järjestettyinä ekaksi Blogi3, toisena Blogi2 ja vikana Blogi1
      cy.get('div.blog').eq(0).should('contain', 'Blogi3')
      cy.get('div.blog').eq(1).should('contain', 'Blogi2')
      cy.get('div.blog').eq(2).should('contain', 'Blogi1')
    })
  })
})
