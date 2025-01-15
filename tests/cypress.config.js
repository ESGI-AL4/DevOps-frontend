const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost",
    setupNodeEvents(on, config) {
    },
  },
});
