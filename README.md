#  <img alt="Buzz" src="./src/baseComponents/logo/images/logo.svg" height="80" width="80"/> Buzz [![Build Status](https://travis-ci.org/pedrovgs/Buzz.svg?branch=master)](https://travis-ci.org/pedrovgs/Buzz)

A portable photo booth built on top of [Electron](https://electronjs.org/), [React](https://reactjs.org/) and [Raspberry Pi](https://www.raspberrypi.org/).

**Disclaimer: I use this repository as a playground for different web experiments. Don't look at the code expecting to find a canonical code example or any good practice :smiley:.

### Running this project:

This repository is built on top of [Electron](https://electronjs.org/) and [React](https://reactjs.org/) using [Yarn](https://yarnpkg.com/en/) for dependency management. Thanks to these tools you can easily run this project on your computer running the following commands:

```
yarn install
yarn run dev // Starts a webpack-dev-server instance with our react application inside and the electron app showing this applicaiton. This command is ideal for development purposes.
yarn start // Starts a webpack-dev-server instance with our react application running on a browser.
```

As we are using React as a core component for this project and our usage of Electron is really simple we'd recommend you to use ``yarn start`` while developing the app so you can easily apply any change to the code during the development stage. When developing any feature directly related to Electron you'll have to use ``yarn run dev``.

### Building this project:

As this project is built on top of [Electron 1.7.12](https://electronjs.org/) we can easily generate distribution binaries for may different platforms. The only version I've got working on Raspbian for now is 1.7.12, that's why we are still using this Electron version. We've configured this project to easily generate the distribution binaries executing the following command:

```
yarn dist
```

You can generate a build for OSX or Raspberry Pi separatelly if needed executing these commands:

```
yarn distMac
yarn distRaspberry
```

**Remember, you'll have to execute ``yarn install first``.

After these commands execution you will find the application executable files into the ``dist`` folder

### Executing tests:

This project contains some tests written using [Jest](https://facebook.github.io/jest/). You can easily run the tests by executing one of the following commands:

```
yarn test // Executes every test inside the src folder.
yarn test --updateSnapshot // Executes every test inside the src folder recording snapshots again.
yarn buildForTests // Builds the app for testing purposes.
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

You can find a complete guide explaining how to do configure the Firebase project [here](https://firebase.google.com/docs/auth/web/password-auth).

**As we are using Firebase to persist the pictures taken remember you'll have to enable Firebase storage and configure the storage rules after creating your app:**

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

**As we are using Firebase to persist the user information related to the pictures taken remember you'll have to configure Firebase database access rules after creating your app as follows:**

```
{
  "rules": {
    "$user_id": {
        ".read": "$user_id === auth.uid",
        ".write": "$user_id === auth.uid",
      }
  }
}
```

### Pictures resolution

As this project uses any camera we can connect to the Raspberri Pi device the screen resolution of the device can vary. By default, the pictures resolutions are 640x480 but the values can be easily configured by adding the following variables to the ``.env.development`` and ``.env.production`` files:

```
REACT_APP_WEB_CAM_RESOLUTION_HEIGHT = <YOUR_WEB_CAM_RESOLUTION>
REACT_APP_WEB_CAM_RESOLUTION_WIDTH = <YOUR_WEB_CAM_RESOLUTION>
```

You can check your device resolution using this [web](https://webcamtests.com/).

### Other configurable values

There are some values we can configure in our small application. This table contains the keys, descriptions and default values for every configurable item in our app:

|ID|DEFAULT|DESCRIPTION|
|REACT_APP_ALBUM_NUMBER_OF_COLUMNS|3|Number of columns used in the album's grid|
|REACT_APP_CELL_HEIGHT|auto|Album's grid cell height. The values can be numbers (300, 400, 500) or the string "auto"|

### Email service:

When a new picture is taken, Buzz will automatically share it with you by email. In order to accomplish this task you'll need to create a free account at [mailgun](https://app.mailgun.com) and create a new file named ``.mailgun.js`` inside the ``functions`` folder. After creating the mailgun account paste the private api key and the automatically generated domain into the ``.mailgun.json`` file as follows:

```
{
  "privateApiKey": "<YOUR_MAILGUN_PRIVATE_API_KEY>",
  "domain": "<YOUR_MAILGUN_DOMAIN>"
}
```

You can configure a real domain if needed.

### Firebase Cloud Functions:

Part of the project is implemented using Firebase Cloud Functions. An example is how the pictures taken are sent to the user logged in email after saving the picture. In order to configure your Firebase project you'll need to follow these steps:

Initialize ``Firebase CLI Tools``

```
yarn install
yarn firebase login # You'll have to introduce your Google credentials :smiley:
cd functions
yarn install # Firebase functions has some dependencies we can manage thanks to yarn!
cd ..
yarn firebase deploy
```

If you change part of the function configuration remember can deploy it again by executing ``yarn firebase deploy``.

Remember that as we need access to the internet from the Firebase Cloud Functions you'll need to set up your Google Cloud Platform account billing in order to get the functions being executed properly. You can find more information [here](https://console.cloud.google.com/billing).

### Raspberry Pi Application

This project was designed to run into a [Raspberry Pi](https://www.raspberrypi.org/). In order to get the project up and running you should follow the next steps:

```
* Create the Firebase account and project and also the mailgun account as described before.
* Clone this project executing "git clone https://github.com/pedrovgs/Buzz.git".
* Create the .env.* and .mailgun.json files as described in the previous sections.
* Initialize the Firebase Cloud Functions. You can do this later from your laptop if needed as described before.
* Build the project by executing "yarn install && yarn distRaspberry" from the root repository folder. The executable application will be placed into the ``dist`` folder at the end of the command execution.
* Get a Raspberry Pi, install a [Raspbian](https://www.raspbian.org/) distribution and connect it to the same WiFi your laptop is connected.
* Find your Raspberry Pi ip address by executing "ping raspberrypi.local".
* Connect to your Raspberry Pi by execting "ssh pi@YOUR_RASPBERRY_PI_IP". The "pi" user passowrd is "raspberry" by default.
* Copy the folder ``dist/Buzz-linux-armv7l`` to the Raspberry Pi. You can compress it if needed.
* Once you've copy the application to your Raspberry Pi. Execute the file named ``Buzz`` you'll find insde the folder. At this point, you should see the application up and running :smiley:
```

***You can generate a equivalent application for OSX executing ``yarn distMac``. The OSX application generated as a result of the command execution will be placed into the ``dist`` folder as well.**

If needed, you can also clone this repository from your Raspberry Pi and build the whole project from scratch executing ``yarn install && yarn distRaspberry`` from the root folder.

**The whole process can take a while, so be patient my firend. The result worth it! :camera:**

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