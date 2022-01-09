# open-pros-cons

A simple pros and cons app for android and web, with no adds, trackers nor malware. [Free as in freedom](https://www.gnu.org/philosophy/free-sw.html).

<a href="https://tobertet.github.io/open-pros-cons" alt="Link to the application" target="_blank">
<img src="https://tobertet.github.io/open-pros-cons/assets/Screenshot.png" alt="Screenshot" width="800"> </a>

<a alt="Link to F-Droid" href="https://f-droid.org/packages/com.robertmengual.open_pros_cons/" target="_blank"><img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png" alt="F-Droid store logo" height="75"></a>

<a alt="Link to Play Store" href="https://play.google.com/store/apps/details?id=com.robertmengual.open_pros_cons" target="_blank"><img src="https://tobertet.github.io/open-pros-cons/assets/google-play-badge.png" height="75"></a>

[Web application](https://tobertet.github.io/open-pros-cons)

[Download it from F-droid](https://f-droid.org/packages/com.robertmengual.open_pros_cons/)

[Download it from Fossdroid](https://fossdroid.com/a/open-pros-cons.html)

[Download it from Play Store](https://play.google.com/store/apps/details?id=com.robertmengual.open_pros_cons)

This project was bootstrapped with [Ionic](https://github.com/ionic-team/ionic-framework) and [Create React App](https://github.com/facebook/create-react-app).
We use [Capacitor](https://github.com/ionic-team/capacitor) for the native app builds.

## Project Setup

The project has been developed using NodeJS v14 so we encourage you to do the same. If you use [nvm](https://github.com/nvm-sh/nvm), you can simply run `nvm use` in the root of the project and it will automatically set that version for you.

The package manager we use is [yarn](https://classic.yarnpkg.com/lang/en/docs/install).

In case you want to build an Android or iOS app you need to install the [Ionic CLI](https://ionicframework.com/docs/intro/cli) and [Android Studio](https://developer.android.com/studio) as well.

## Bundling the application

### Web

Run the command `yarn build` and the web application will be available under the `build` directory.

### Android

_Requires Ionic CLI and Android Studio._

Run the command `ionic cap build android` and the android project will be available under the `android` directory.

If you only want to run the app, you can run the command `ionic cap run android` and the app will be run in your pluged device or in a simulator.

### iOS

_Requires Ionic CLI, XCode and a Mac machine._

Run the command `ionic cap build ios` and the ios project will be available under the `ios` directory.

If you only want to run the app, you can run the command `ionic cap run ios` and the app will be run in your pluged device or in a simulator.

## Available Scripts

In the project directory, you can run:

### `yarn`

Installs all the dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Shows the test coverage for the unit tests.

### `yarn build`

Builds the _web app_ for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Runs eslint and prettier on all the files in the /src folder. This linter has been configured to be extended with rules for jest, prettier and cypress.

### `yarn cypress:open`

Opens up the cypress UI for running the e2e test suite.

### `yarn android:run`

Bundles and creates the android App so that it can be run on any android phone or simulator. This command requires having the Ionic CLI installed.

## Contributing

You can contribute in many ways in this project. From the design and UX to the implementation. Any help is more than welcome.

Another way is simply by downloading the app from FDroid or Play Store. You can always create a pros and cons list about creating a pros and cons list!
