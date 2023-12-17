# Getting Started with InstaClone

Prepared by: Sawmon Abossedgh

_Note: This app currently only focuses on a working version for IOS devices._

<!-- <img align="right" width="250" height="220" src="https://user-images.githubusercontent.com/77422313/209737042-c726972d-1428-468f-904d-df84ba6149e0.png"> -->

## Contents

- [Getting Started](#getting-started)
- [Setting Up Firebase](#setting-up-firebase)
- [Starting the App](#starting-the-app)

## Getting Started

- First step to being able to run Instaclone is by opening up your terminal and cloning the repo using:
  ```
  git clone https://github.com/Sawmonabo/instaClone.git
  ```
- Once you clone the repo you're going to want to run the command `yarn or npm i` to download required dependencies from the package.json
- Next make sure you have Xcode up-to-date so you can run thier Simulator application.
- Finally, in the project folder rename the file `example.config.js` to just `config.js`.
  - We will be adding our firebase configurations to this in the next step.

## Setting Up Firebase

- Create and/or login to your Firebase account and follow these steps:

  1. Click `Add project` and name it `InstaClone` and the select `Use Default Account for Firebase`
  2. Click `Add web app` at the top middle and name it `instaClone` and continue
  3. Copy the `firebaseConfig` keys and add them to the `config.js` file we renamed earlier
  4. On the left menu bar click `Build` => `Firestore Database` => `Create Database`
     - Select whichever location is closer to you
     - Then select `Start in Test Mode` => `Enable`
  5. Within the Cloud Firestore console, click `Rules` and copy and paste the following below:

     ```js
     rules_version = '2';

     service cloud.firestore {
     match /databases/{database}/documents {

         // This rule allows anyone with your Firestore database reference to view, edit,
         // and delete all data in your Firestore database. It is useful for getting
         // started, but it is configured to expire after 30 days because it
         // leaves your app open to attackers. At that time, all client
         // requests to your Firestore database will be denied.
         //
         // Make sure to write security rules for your app before that time, or else
         // all client requests to your Firestore database will be denied until you Update
         // your rules
         //
         // match /{document=**} {
         //   allow read, write: if request.time < timestamp.date(2024, 1, 2);
         // }

     function userIsAuthenticated() {
             return request.auth != null;
         }

         match /{path=**}/posts/{postId} {
             allow read, write: if userIsAuthenticated();
         }

         match /users/{userId} {
             allow read, write: if userIsAuthenticated();
         }
     }
     }
     ```

  6. On the left menu bar click `Build` => `Authentication` => `Get Started`
     - Under `Native Providers` select `Email/Password` and enable `Email/Password`
     - Don't enable `Email Link`, just `Save`

## Starting the App

- After installing the dependencies, go ahead and start the application with `yarn run ios or npm run ios`.
- Once the app has successfully started on your simulator go ahead and `Sign Up` and start exploring!
