/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('Emanuel')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('envia o formulário utlizando o clock e o tick', function() {
    cy.clock()
    cy.get('#firstName').type('Emanuel')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('verifica o texto', function() {
    const textoLongo = 'Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo! Olá mundo!'

    cy.get('#open-text-area').type(textoLongo, { delay: 0 }).should('have.value', textoLongo)
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Emanuel')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('teste.teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone vazio quando informado caractere não numérico', function() {
    cy.get('#phone').type('abc').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Emanuel')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('teste.teste.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Emanuel').should('have.value', 'Emanuel')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Carvalho').should('have.value', 'Carvalho')
      .clear().should('have.value', '')
    cy.get('#email')
      .type('teste.teste.com').should('have.value', 'teste.teste.com')
      .clear().should('have.value', '')
    cy.get('#phone')
      .type('71992929292').should('have.value', '71992929292')
      .clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('clicar no botão utilziando o cy.contains', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('selecionar um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('selecionar um produto (Mentoria) por seu valor', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('selecionar um produto (Blog) por seu índice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('selecionar uma opção no tipo de atendimento', function() {
    //pode ser utiliado o .check ou o .click
    cy.get('input[type=radio][value=feedback]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {
    //pode ser utiliado o .check ou o .click
    cy.get('input[type=radio]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type=checkbox]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Emanuel')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('teste.teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function() {
    const longText = Cypress._.repeat('012345678 ', 50)
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)

    // tempo de axecução 0.10 segundos
  })

  it('preenche a area de texto sem usar o comando invoke', function() {
    const longText = Cypress._.repeat('012345678 ', 50)
    cy.get('#open-text-area')
      .type(longText).should('have.value', longText)

    //tempo de execução: 6 segundos
  })

  it('faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it.only('encontra o gato escondido', function() {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT')
    cy.get('#subtitle')
      .invoke('text', 'teste do gatinho')
  })

})
  