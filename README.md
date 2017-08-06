# FirebaseCms

A basic CMS + Front End theme built with Angular 4 (Angular CLI) and AngularFire2. Manage pages, blog posts, navigation, themes and users with this tool.

## Installation

Install [Angular CLI](https://cli.angular.io/)

Run `npm install` or `yarn install`

## Firebase setup

Create a [Firebase account](https://firebase.google.com/), create a new project, and copy the config code for your project.

Within the project folder, run:

```
cd src
mkdir environments
cd environments
touch environment.ts
touch environment.prod.ts
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

Run `ng serve` for a dev server. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/` to access the front end.

Navigate to `http://localhost:4200/login` to access the login page (login is via Google).

Navigate to `http://localhost:4200/admin` to access the CMS (user must be logged in and must be part of '/admins' in the Firebase database to access the CMS).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

