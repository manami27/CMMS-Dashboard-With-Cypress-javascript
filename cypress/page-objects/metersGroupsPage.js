class MetersGroupsPage {
  visit() {
    cy.get(":nth-child(2) > .nav-item").click();
    cy.get('[href="#/page/assets/meters-&-groups"] > p').click();
    cy.url().should(
      "eq",
      Cypress.config("baseUrl") + "page/assets/meters-&-groups"
    );
  }

  performGlobalSearch(query) {
    cy.get(".p-4 > :nth-child(1) > :nth-child(1) > .flex > .border-none").type(
      query
    );
  }

  searchByMeter(query) {
    cy.get(":nth-child(1) > .px-3 > .flex").type(query);
  }

  searchByMeterDescription(query) {
    cy.get(":nth-child(2) > .px-3 > .flex").type(query);
  }

  searchByMeterType(query) {
    cy.get(":nth-child(3) > .px-3 > .flex").type(query);
  }

  downloadMeterList() {
    cy.get(".p-4 > :nth-child(1) > .cursor-pointer").click();
  }

  createNewMeter() {
    cy.get(".btn-primary").click();
    cy.get("#btn-action-Meter-0 > .ml-2").should("be.visible").click();
  }

  fillMeterForm(data) {
    cy.get(":nth-child(1) > :nth-child(2) > .form-control").type(
      data.meterDescription
    );
    cy.get("#react-select-2-input").type(data.meterType);
    cy.get("#react-select-3-input").click();
    cy.get("#react-select-3-option-0").click();
    cy.get("#react-select-4-input").click();
    cy.get("#react-select-4-option-0").click();
    cy.get("#react-select-5-input").click();
    cy.get("#react-select-5-option-0").click();
  }

  submitForm() {
    cy.get('button[type="submit"]').click();
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-confirm").click();
  }

  verifySuccessMessage() {
    cy.get("#swal2-title").should("contain", "Success!");
  }
}

export default MetersGroupsPage;
