# FirebaseCMS

A CMS and E-commerce platform with a Front End theme built with Angular 4 (Angular CLI), Firebase (AngularFire2), Angular Material and Stripe. Manage pages, blog posts, products, orders, customers, carts, navigation, themes and admins with this tool.

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

Open 'environment.ts' and add your Firebase config as follows:

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

Open 'environment.prod.ts' and add your Firebase config as follows:

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

## Create Admin Account

You'll need to manually add your first admin account. To generate a hashcode for it...

1) Run `npm run hashcode` and enter your email. Copy hashcode
2) Create new entry in your firebaseDB under, `/admins/{HASCODE}/{EMAIL}`
3) Create user in firebase user management with same email.

## Development server

Run `ng serve` for a dev server. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/` to access the front end.

Navigate to `http://localhost:4200/login` to access the login page (login is via Google).

Navigate to `http://localhost:4200/admin` to access the CMS (user must be logged in and must be part of '/admins' in the Firebase database to access the CMS).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

