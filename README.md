**Create package lock json**

```bash
npm init
```

**Install Cypress**

```bash
npm install --save-dev cypress@12.6.0
```

**Install npx**

Check npx installed `npx --version` and perform command below if not installed

```bash
npm install -g npx
```

**Configure Cypress**

```bash
npx cypress open
```

**Install Material Icon Theme and Prettier vscode plugins**

**Install and configure Cucumber**

```bash
npm install --save-dev @badeball/cypress-cucumber-preprocessor
```

Copy configuration code to your `cypress.config.ts`

```ts
import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'

export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      // Make sure to return the config object as it might have been modified by the plugin.
      return config
    },
  },
})
```

Import missing library

```bash
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
```

When error like below appears after opening cypress `npx cypress open`

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
```

install mising dependencies from `https://github.com/TypeStrong/ts-loader`

```bash
npm install ts-loader --save-dev
```

**Install Cucumber (Gherkin) Full Support vscode plugin**

**Configure `settings.json` and `package.json`**

Add to the settings.json

```json
"cucumberautocomplete.steps": ["cypress/support/step_definitions/*.js"]
```

Add to the package.json

```json
"cypress-cucumber-preprocessor": {
    "stepDefinitions": "cypress/support/step_definitions/**/*.js"
}
```

**Tips**

Remove target attribute to open link in the same browser card

```js
cy.get('#contact-us').invoke('removeAttr', 'target').click()
```

Install cypress xpath plugin

```bash
npm install -D cypress-xpath
```

Add plugin to the `e2e.js` file

```js
require('cypress-xpath')
```

**Capturing alert window**

```js
let stub = cy.stub()
cy.on('window:alert', stub)

expect(stub).to.have.been.calledWith(expectedAlertText)
```

**Executing tests using tags**

```bash
npx cypress run -e TAGS='@login' --headed
npx cypress run -e TAGS='@login or @contact-us' --headed
npx cypress run -e TAGS='(@login or @contact-us) and not @smoke' --headed
npx cypress run cypress/e2e/*.feature --headed
```

**HTML Reports**

Add to the `package.jsom`

```json
"html": {
  "enabled": true,
  "output": "cypress/reports/cucumber-html/cucumber-report.html"
}
```

to trigger report creation use `npm run 'scriptName'` it creates `cucumber-messages.ndjson` file and `reports` folder with html report file `cucumber-report.html`

`cucumber-messages.ndjson` can be relocated using option in `package.json`

```json
"messages": {
  "enabled": true,
  "output": "cypress/reports/cucumber-ndjson/cucumber-report.ndjson"
}
```

**Json Reports**

Go to the `https://github.com/cucumber/json-formatter`

Download `cucumber-json-formatter-windows-amd64` and rename it to `cucumber-json-formatter.exe`
Move it to a directory that's on your `PATH`
Verify that you can run it: `cucumber-json-formatter --help`

Add to `package.json`

```json
"json": {
  "enabled": true,
  "formatter": "cucumber-json-formatter",
  "output": "cypress/reports/cucumber-json/cucumber-report.json"
}
```

**Multiple Cucumber HTML Reporter**

Link to the npm package `https://www.npmjs.com/package/multiple-cucumber-html-reporter`

Install using npm command `npm install multiple-cucumber-html-reporter --save-dev`

Create new file in root path `cucumber-html-report.js` with body

```js
const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'cypress/reports/cucumber-json',
  reportPath: 'cypress/reports/html-multi-report',
  ignoreBadJsonFile: true,
  displayReportTime: true,
  displayDuration: true,
  metadata: {
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '11',
    },
  },
})
```

Run the tests and generate report `node cucumber-html-report.js`

Combined script commands can be used

```json
"full-regression-headless-chrome": "cypress run --headless --browser chrome --spec 'cypress/e2e/*.feature' & node cucumber-html-report.js"
or
"full-regression-headless-chrome": "cypress run --headless --browser chrome --spec 'cypress/e2e/*.feature'|| node cucumber-html-report.js"
```

**Hooks**

```js
Before(() => {
  cy.log('Executes before each scenario/test')
})

Before({ tags: '@smoke' }, () => {
  cy.log('Executing smoke pack')
})

Before({ tags: '@smoke or @bar' }, () => {
  cy.log('Executing smoke pack')
})

Before({ tags: '@smoke and not @bar' }, () => {
  cy.log('Executing smoke pack')
})

After(() => {
  cy.log('Executes after each scenario/test')
})
```

**Jenkins**

Install `nodejs` Jenkins plugin

To restart jenkins `http://localhost:8080/restart`

Set Use custom workspace and Directory to `C:\Users\lukko\repos\cypress-cucumber`
