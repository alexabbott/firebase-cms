# FirebaseCms

A basic CMS + Front End theme built with Angular 4 (Angular CLI) and AngularFire2. Manage pages, blog posts, navigation, themes and users with this tool.

## Installation

Install [Angular CLI](https://cli.angular.io/)  

Run `npm install`

## Firebase setup

Create a [Firebase account](https://firebase.google.com/), create a new project, and copy the config code for your project.  

Within the project folder, run:

```
cd src
mkdir environments
cd environments
touch environments.ts
touch environments.prod.ts
```

Open 'environments.ts' and add your Firebase config as follows:

```javascript
export const environment = {
  production: false,
  firebase: {
    apiKey: "xxxx",
    authDomain: "xxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx"
  }
};
```

Open 'environments.prod.ts' and add your Firebase config as follows:

```javascript
export const environment = {
  production: true,
  firebase: {
    apiKey: "xxxx",
    authDomain: "xxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxx",
    messagingSenderId: "xxxx"
  }
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

