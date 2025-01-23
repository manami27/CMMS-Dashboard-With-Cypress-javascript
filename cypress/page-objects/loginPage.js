class LoginPage {
  visit() {
    cy.visit("/");
  }

  login(username, password) {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  }

  getErrorMessage() {
    return cy.get(".alert");
  }

  verifyDashboardUrl() {
    cy.url().should("eq", Cypress.config("baseUrl") + "page/dashboard");
  }
}

export default LoginPage;
