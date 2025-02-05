import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost",
     //eslint-disable-next-line
    setupNodeEvents(on, config) {
    },
  },
});
