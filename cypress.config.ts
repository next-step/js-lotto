import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // implement node event listeners here
      console.log(on, config);
    },
    baseUrl: 'http://localhost:9000',
  },
});
