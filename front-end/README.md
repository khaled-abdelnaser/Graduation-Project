## Project Setup & Development Guide

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4. Follow the steps below to set up your environment and get the application running.

---

## 1. Prerequisites (If you don't have Angular)

If you are new to Angular or don't have the environment ready, follow these steps first:

### Install Node.js

Angular requires **Node.js**. Download and install the "LTS" version from [nodejs.org](https://nodejs.org/). This will also install **npm** (Node Package Manager), which is required to manage project dependencies.

### Install Angular CLI

Once Node.js is installed, open your terminal and run the following command to install the Angular CLI globally:

```bash
npm install -g @angular/cli

```

---

## 2. Initial Setup (Installing node_modules)

When you first clone or download this project, the `node_modules` folder (which contains all the project's libraries) is not included. You **must** install them before running the server.

Navigate to the project directory in your terminal and run:

```bash
npm install

```

This command reads the `package.json` file and downloads all necessary dependencies into your local project folder.

---

## 3. Development Server

To start a local development server, run:

```bash
ng serve

```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any source files.

---

## 4. Useful Commands

### Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name

```

For a complete list of available schematics (like `directives` or `pipes`), use `ng generate --help`.

### Building

To compile the project for production, run:

```bash
ng build

```

The artifacts will be stored in the `dist/` directory, optimized for performance.

### Testing

* **Unit Tests:** Run `ng test` to execute tests via the Karma runner.
* **End-to-End Tests:** Run `ng e2e` (requires an e2e framework of your choice).

---

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
