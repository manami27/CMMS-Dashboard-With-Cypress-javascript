import LoginPage from "../page-objects/loginPage";
import MetersGroupsPage from "../page-objects/metersGroupsPage";
import credentials from "../fixtures/credentials.json";
import searchText from "../fixtures/searchText.json";

function generateRandomName() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const lettersLength = letters.length;
  const randomStringLength = 8; // Length of the random string of letters
  const randomNumberLength = 4; // Length of the random number

  // Generate a random string of letters
  let randomString = "";
  for (let i = 0; i < randomStringLength; i++) {
    const randomIndex = Math.floor(Math.random() * lettersLength);
    randomString += letters.charAt(randomIndex);
  }

  // Generate a random number
  const randomNumber = Math.floor(
    Math.pow(10, randomNumberLength - 1) +
      Math.random() *
        (Math.pow(10, randomNumberLength) -
          Math.pow(10, randomNumberLength - 1))
  );

  // Concatenate the random string and the random number
  const randomName = `${randomString}${randomNumber}`;

  return randomName;
}

describe("Meters & Groups Module Test Cases", () => {
  const loginPage = new LoginPage();
  const metersGroupsPage = new MetersGroupsPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.login(credentials.valid.username, credentials.valid.password);
    metersGroupsPage.visit();
  });

  it("Perform Global Search", () => {
    metersGroupsPage.performGlobalSearch(searchText.searchText);
    cy.wait(2000);
    cy.get(".divide-y-2 > :nth-child(1) > :nth-child(1)")
      .invoke("text")
      .then((text) => {
        expect(text.trim().toLowerCase()).to.include(
          searchText.searchText.toLowerCase()
        );
      });
  });

  it("Search By Meter", () => {
    metersGroupsPage.searchByMeter(searchText.searchMeter);
    cy.wait(2000);
    cy.get(".divide-y-2 > :nth-child(1) > :nth-child(1)")
      .invoke("text")
      .then((text) => {
        expect(text.trim().toLowerCase()).to.include(
          searchText.searchMeter.toLowerCase()
        );
      });
  });

  it("Search By Meter Description", () => {
    metersGroupsPage.searchByMeter(searchText.searchDescription);
    cy.wait(2000);
    cy.get(".divide-y-2 > :nth-child(1) > :nth-child(1)")
      .invoke("text")
      .then((text) => {
        expect(text.trim().toLowerCase()).to.include(
          searchText.searchDescription.toLowerCase()
        );
      });
  });

  it("Search By Meter Type", () => {
    metersGroupsPage.searchByMeterType(searchText.searchType);
    cy.wait(2000);
    cy.get(".divide-y-2 > :nth-child(1) > :nth-child(3)")
      .invoke("text")
      .then((text) => {
        expect(text.trim().toLowerCase()).to.include(
          searchText.searchType.toLowerCase()
        );
      });
  });

  it("Download Meter List", () => {
    metersGroupsPage.downloadMeterList();
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-popup").should("be.visible");
    cy.get("#swal2-title").should("have.text", "Success!");
  });

  it("Create a new meter", () => {
    console.log(generateRandomName());
    const randomName = generateRandomName();

    metersGroupsPage.createNewMeter();
    cy.get(":nth-child(1) > .form-control").type(randomName);
    // Load the form data from the JSON file
    cy.fixture("meterData").then((data) => {
      // Fill in the form fields with data from the JSON file
      metersGroupsPage.fillMeterForm(data);
      metersGroupsPage.submitForm();
      metersGroupsPage.verifySuccessMessage();
    });
  });
});
