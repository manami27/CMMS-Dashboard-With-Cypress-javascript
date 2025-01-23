const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://cmms.dev.aegislabs.work/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
