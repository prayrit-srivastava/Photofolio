const url = "http://localhost:3000/";
describe('App logic and functionality is implemented correctly', () => {
  it('AlbumForm is conditionally rendered when the button is clicked', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.get('button').contains(/Add album/i).click();
    cy.wait(2000);
    cy.get('form').should('exist');
    cy.contains(/Create an album/i).should('exist');
    cy.contains('button', /Cancel/i).click();
    cy.wait(2000);
    cy.get('form').should('not.exist');
    cy.contains(/Create an Album/i).should('not.exist');
  });
  // it('App renders the image list when the user clicks on an album', () => {
  //   cy.visit(url); // Assuming your App is served at the root route
  //   cy.wait(2000);
  //   cy.contains('first', { matchCase: false }).click();
  //   cy.wait(2000);
  //   cy.contains('Images in first').should('exist');
  //   cy.get('img').should('exist');
  // });
  
  it('ImageForm is conditionally rendered when the button is clicked', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('first', { matchCase: false }).click();
    cy.wait(2000);
    cy.contains('button', /Add image/i).click();
    cy.wait(2000);
    cy.get('form').should('exist');
    cy.contains('Add image to').should('exist');
    cy.contains('button', /Cancel/i).click();
    cy.wait(2000);
    cy.get('form').should('not.exist');
    cy.contains('Add image to').should('not.exist');
  });
  
  it('App renders the album list when the back button is clicked', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('first', { matchCase: false }).click();
    cy.wait(2000);
    cy.get('img[alt="back"]').click();
    cy.wait(2000);
    // cy.contains('second', { matchCase: false }).should('exist');
    cy.get('img[alt="back]').should('not.exist');
  }); 
});
describe("Integration with firebase is implemented correctly", () => {
  it('Album is added when the form is submitted', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('button', /Add album/i).click();
    cy.wait(2000);
    cy.get('input[placeholder="Album Name"]').type('testalbumxyz');
    cy.contains('button', /Create/i).click();
    cy.wait(2000);
    cy.contains('testalbumxyz', { matchCase: false }).should('exist');
  });
  it('Image is added when the form is submitted', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('first', { matchCase: false }).click();
    cy.wait(2000);
    cy.contains('button', /Add image/i).click();
    cy.wait(2000);
    cy.get('input[placeholder="Title"]').type('testtitle');
    cy.get('input[placeholder="Image URL"]').type('testurl');
    cy.contains('button', /Add/i).click();
    cy.wait(2000);
    cy.get('img[alt="testtitle"]').should('exist');
  });
  it('Image is updated when the update button is clicked', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('first', { matchCase: false }).click();
    cy.wait(2000);
    cy.get('img[alt="testtitle"]').trigger('mouseover');
    cy.wait(2000);
    cy.get('img[alt="update"]').first().click();
    cy.wait(2000);
    cy.get('input').should('have.value', 'testtitle');
    cy.get('input').first().clear()
    cy.wait(2000);
    cy.get('input').first().type('testupdate');
    cy.contains('button', /Update/i).click();
    cy.get('img[alt="testupdate"]').should('exist');
  });

  it('Image is deleted when the delete button is clicked', () => {
    cy.visit(url); // Assuming your App is served at the root route
    cy.wait(2000);
    cy.contains('first', { matchCase: false }).click();
    cy.wait(2000);
    cy.contains('button', /Add image/i).click();
    cy.wait(2000);
    const title = 'test' + new Date().toISOString().slice(0, 15);
    cy.get('input[placeholder="Title"]').type(title);
    cy.get('input[placeholder="Image URL"]').type('testurl');
    cy.contains('button', /Add/i).click();
    cy.wait(2000);
    cy.get(`img[alt="${title}"]`).first().trigger('mouseover');
    cy.wait(2000);
    cy.get('img[alt="delete"]').first().click();
    cy.wait(2000);
    cy.get(`img[alt="${title}"]`).should('not.exist');
  });
  
});