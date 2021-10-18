This repository is organized with nx, please refer to their [documentation](https://nx.dev/latest/angular/getting-started/nx-cli) for more information.

## Prerequisites to develop

- [NodeJs](https://nodejs.org/en/)
- [NPM CLI](https://docs.npmjs.com/cli/), is often installed automatically with Node JS

## Getting started

Run in the root folder of the repository:

```
npm install
```

To start the dev servers, run each command in separate terminals:

```
npx nx serve power-comp-ui
npx nx serve power-comp-api
```

Access the ui in at localhost:4200 in the browser.

Add a `power-comp.env` file in the root folder and [configure](installation?id=configuration) according to your needs.
