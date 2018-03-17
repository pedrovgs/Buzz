#  <img alt="Buzz" src="./src/baseComponents/logo/images/logo.svg" height="80" width="80"/> Buzz [![Build Status](https://travis-ci.org/pedrovgs/Buzz.svg?branch=master)](https://travis-ci.org/pedrovgs/Buzz)

A portable photo booth built on top of [Electron](https://electronjs.org/), [React](https://reactjs.org/) and [Raspberry Pi](https://www.raspberrypi.org/).

### Running this project:

This repository is built on top of [Electron](https://electronjs.org/) and [React](https://reactjs.org/) using [Yarn](https://yarnpkg.com/en/) for dependency management. Thanks to these tools you can easily run this project on your computer running the following commands:

```
yarn install
yarn run dev // Starts a webpack-dev-server instance with our react application inside and the electron app showing this applicaiton. This command is ideal for development purposes.
yarn start // Starts a webpack-dev-server instance with our react application running on a browser.
```

### Configuring this project:

This project uses [Firebase](https://firebase.google.com) in order to sing in the user and upload the pictures so if you want to build a custom version of this project you'll need to follow the following steps. Without a Firebase project associated you won't be able to run the project properly.

Steps to create a Firebase account:

* Go to your [Firebase Console](https://console.firebase.google.com/) and create a project.
* After creating a project, click on "Add Firebase to your web app".
* Go to the authentication menu and enable Google as an authenticator provider.
* Back to the application screen copy the config values you'll see if you tap on the button named "Add Firebase to your web application". You should the following config values:

```javascript
var config = {
    apiKey: "AIzaSyAFF1HzzasdffNzysOQqKbNfm4K7Wtasdf",
    authDomain: "my-app.firebaseapp.com",
    databaseURL: "https://my-app.firebaseio.com",
    projectId: "my-app",
    storageBucket: "my-app.appspot.com",
    messagingSenderId: "123240264111"
}
```

* Paste the previously copied values into a file named ``.env.development`` and ``.env.production`` inside root folder as follows:

```
REACT_APP_FIREBASE_API_KEY="AIzaSasfd1HzzpgX6fNzysOQqKbNfm4K7Wtasdf"
REACT_APP_FIREBASE_AUTH_DOMAIN="my-app.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL="https://my-app.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID="my-app"
REACT_APP_FIREBASE_STORAGE_BUCKET="my-app.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="123240261111"
```

You can find a complete guide explaining how to do configure the Firebase project [here](https://firebase.google.com/docs/auth/web/google-signin).

### Executing tests:

This project contains some tests written using [Jest](https://facebook.github.io/jest/). You can easily run the tests by executing one of the following commands:

```
yarn test // Executes every test inside the src folder.
yarn buildForTests // Builds the app for testing purposes. Needed before executing the screenshot tests
yarn verifyScreenshotTests // Executes every test in record mode.
yarn recordScreenshotTests // Executes every test in record mode.
yarn test --watch // Watch files for changes and rerun tests related to changed files.
yarn test --watchAll // Watch files for changes and rerun every test.
yarn test --testRegex "String calculator spec*" //Executes tests matching with the regex passed as param.
```

This repository contains some tests written using a testing strategy named [visual regression testing](https://www.phase2technology.com/blog/new-and-exciting-area-front-end-development-regression-testing) or [screenshot testing](https://github.com/Karumi/Shot/). Under the hood, we are using [spectron](https://github.com/electron/spectron) and [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) in order to run the app, take the screenshot and compare them with the baseline images. **However, a library used by ``jest-image-snapshot`` is not compatible with ``node-9`` so we need to force ``node-8`` to be able to run our tests. Sorry for the inconveniences, [here](https://github.com/lukeapage/pngjs/issues/95) you can find more information about the bug. And [here](https://github.com/americanexpress/jest-image-snapshot/issues/31) the original issue named: Image comparison of snapshots crashes node v9.2.0.**

The rest of the tests in this repository are placed inside the ``src`` folder and are regular unit and integration tests.

### Linter:

This repository uses [eslint](https://eslint.org/) in order to check if the js code written matches the checkstyle configured. You can check if everything is ok by executing ``yarn lint`` and automatically fix the issues by executing ``yarn fixLint`` if needed.

Developed By
------------

* Pedro Vicente Gómez Sánchez - <pedrovicente.gomez@gmail.com>

<a href="https://twitter.com/pedro_g_s">
  <img alt="Follow me on Twitter" src="https://image.freepik.com/iconos-gratis/twitter-logo_318-40209.jpg" height="60" width="60"/>
</a>
<a href="https://es.linkedin.com/in/pedrovgs">
  <img alt="Add me to Linkedin" src="https://image.freepik.com/iconos-gratis/boton-del-logotipo-linkedin_318-84979.png" height="60" width="60"/>
</a>

License
-------

    Copyright 2018 Pedro Vicente Gómez Sánchez

    Licensed under the GNU General Public License, Version 3 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.gnu.org/licenses/gpl-3.0.en.html

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.