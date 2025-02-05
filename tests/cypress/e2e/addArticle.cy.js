describe("Test adding an article", () => {

    before("Get articles number", () => {
        cy.request("http://localhost:8000/articles").its('body.length').as('articlesNumber');
        cy.visit("/");
    })

    it("Add an article", () => {
        cy.visit("/");
        cy.get('[data-cy-role="add-article"]').click();
        cy.wait(500);
        cy.get('#title').type('Test Article');
        cy.get('#subtitle').type('Test Subtitle');
        cy.get('#summary').type('Test Summary');

        cy.get('[data-cy-role="submit-add-article"]').click();

        cy.request('http://localhost:8000/articles').then((response) => {
            cy.get('@articlesNumber').then(num => {
                expect(response.body.length).to.be.eq(num + 1);
            })
        });
    });
})