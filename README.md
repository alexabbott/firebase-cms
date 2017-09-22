# FirebaseCMS

FirebasCMS is an e-commerce and blogging platform with a storefront and CMS built with Angular 4 (Angular CLI), Firebase (AngularFire2), Angular Material and Stripe. Create, moderate and manage pages, blog posts, products, orders, customers, carts, navigation, themes, admins and more with this web application.


## Demo

* Check out the front end application: https://fir-cms-76f54.firebaseapp.com
* Check out the admin interface: https://fir-cms-76f54.firebaseapp.com/login
  * Admin login details: admin@admin.com / admin123
    * This user has an 'editor' role
    * All of the data will be reset once a week


## Installation

Install [Angular CLI](https://cli.angular.io/)
```
npm install -g @angular/cli
```

Install NPM packages

```
Run `npm install` or `yarn install`
cd functions/
Run `npm install`
```

## Firebase setup

Create a [Firebase account](https://firebase.google.com/), create a new project, and copy the config code for your project.

Enable Google, Email/Password and Anonymous in the 'Sign-In Method' tab of the Authentication section in your Firebase project Console.

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

## Stripe setup

Create a [Stripe account](https://stripe.com/).

Add your Stripe API Secret Key to firebase config:
```
firebase functions:config:set stripe.token=<YOUR STRIPE SECRET KEY>
```

Open 'environment.ts' and add your Stripe Publishable API Key as follows:

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
  },
  stripe: "<YOUR STRIPE PUBLISHABLE KEY>"
};
```

Open 'environment.prod.ts' and add your Stripe Publishable API Key as follows:

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
  },
  stripe: "<YOUR STRIPE PUBLISHABLE KEY>"
};
```

## Create SuperAdmin Account

You'll need to manually add your first admin account. To generate a hashcode for it...

1) Run `npm run hashcode` and enter your email. Copy hashcode
2) Create new entry in your firebaseDB under, `/admins/<YOUR HASHCODE>/` as follows:

```javascript
admins: {
  <YOUR HASH CODE>: {
    {
      email: '<YOUR EMAIL>',
      role: 'super-admin'
    }
  }
}
```

3) Create user in firebase user management with same email.

## Email Confirmation setup

1. To allow the app to send confirmation emails through a Gmail account: enable access to [Less Secure Apps](https://www.google.com/settings/security/lesssecureapps) and [Display Unlock Captcha](https://accounts.google.com/DisplayUnlockCaptcha). For accounts with 2-step verification enabled, [Generate an App Password](https://support.google.com/accounts/answer/185833).
2. Set the gmail.email and gmail.password Google Cloud environment variables to match the email and password of the Gmail account used to send emails (or the app password if your account has 2-step verification enabled). For this use:
```
firebase functions:config:set gmail.email="<EMAIL ADDRESS>" gmail.password="<PASSWORD>"
```

## Local configuration for server-side rendering

Copy your config JSON ouput into a config.json file inside the functions folder, which will be used for running the Cloud Functions locally.

Run `firebase functions:config:get` and copy the output

```
cd functions/
touch config.json
```

Run `firebase functions:config:get` and paste the output into config.json

## Development server

Run `ng serve` for a dev server. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/` to access the front end.

Navigate to `http://localhost:4200/login` to access the login page (login is via Google).

Navigate to `http://localhost:4200/admin` to access the CMS (user must be logged in and must be part of '/admins' in the Firebase database to access the CMS).

Run `firebase serve --only hosting,functions` to run the server-side rendered version of the storefront

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Deploy

Run `npm run deploy` to deploy your project. This command will first build the app for production and then deploy it to Firebase hosting.

## Admin Roles

There are 3 Admin Roles:
* super-admin
* admin
* editor

| Permission                          | super-admin | admin       | editor      |
| ------------------------------------|:-----------:|:-----------:|:-----------:|
| create new entities                 | ✓           | ✓           | ✓           |
| edit entities                       | ✓           | ✓           | ✓           |
| submit entities for approval        | ✓           | ✓           | ✓           |
| save entities                       | ✓           | ✓           | ×           |
| delete entities                     | ✓           | ✓           | ×           |
| publish/unpublish entities          | ✓           | ✓           | ×           |
| edit items awaiting approval        | ✓           | ✓           | ×           |
| approve/disapprove changes          | ✓           | ✓           | ×           |
| view/add/edit/delete orders         | ✓           | ✓           | ×           |
| view/add/edit/delete customers      | ✓           | ✓           | ×           |
| view/add/edit/delete menus          | ✓           | ✓           | ×           |
| view/add/edit/delete theme settings | ✓           | ✓           | ×           |
| view/add/edit/delete admins         | ✓           | ×           | ×           |
