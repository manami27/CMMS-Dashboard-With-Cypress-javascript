import LoginPage from "../page-objects/loginPage";
import credentials from "../fixtures/credentials.json";

describe("Login Test Cases", () => {
  const loginPage = new LoginPage();

  it("Positive Login Test", () => {
    loginPage.visit();
    loginPage.login(credentials.valid.username, credentials.valid.password);
    loginPage.verifyDashboardUrl();
  });

  it("Negative Login Test - Invalid Username", () => {
    loginPage.visit();
    loginPage.login(credentials.invalid.username, credentials.valid.password);
    loginPage.getErrorMessage().should("be.visible");
  });

  it("Negative Login Test - Invalid Password", () => {
    loginPage.visit();
    loginPage.login(credentials.valid.username, credentials.invalid.password);
    loginPage.getErrorMessage().should("be.visible");
  });
});
