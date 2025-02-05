//eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost",
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
    },
  },
});
