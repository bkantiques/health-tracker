# Health Tracker

This app lets users search for and save foods they have eaten and view calorie stats and charts.

## Installation

Clone the GitHub repository, use npm to install the node modules, go to the src directory and
install the bower modules, and finally go back to the root directory and build the project with
grunt. The app will not run correctly without all these steps.

```
git clone https://github.com/bkantiques/health-tracker.git
npm install
cd src
bower install
cd ..
grunt build
```

## Usage

You can run 'grunt watchSync' in the root directory to start a local server. Your port number will be
displayed in node, then to view the src version of the app, you can navigate in the browser to
`localhost:[port number]/src/` or to view the fully built version, go to `localhost:[port number]/dist/`.

## Build process

If you make changes in the `src` directory and want to build the `dist` directory, use
`grunt build`.

Runnning `grunt watchSync` automatically runs the build task when changes are made in the `src` directory
to index.html, `js` files in the `js` directory or `css/sass/style.scss`. It also refreshes the browser with
browser sync. When running watchSync, the command line will tell you what port it is running on. To view
the project and have it automatically refresh when changes are made, you must navigate to
`localhost:[port]/src/` for the `src` version or `localhost:[port]/dist/` for the `dist` version.

The build process includes Sass processing, css and js concatenation and minification, css autoprefixing,
browser sync and html processing.

## Features

The app uses Firebase to keep track of user accounts and data. It allows the user to search the Nutritionix
API for food items on the fly, as the user types. When an item is clicked on, a record is made of the user
eating that item on the selected date. The records are displayed below the search results, and can be deleted by
clicking the red 'x' in each record. The user can click 'View Stats' to see stats and a chart for various
time ranges. Data and login status is persisted with Firebase. The charts are made with Chart.js. The app is built
using Backbone.

## Issues

The app uses Promises, which may not be supported in older browsers. There is also a limit on the number of
Nutritionix API requests that can be made per day using the key that is currently in the app. The app consumes these
requests quickly since it searches on the fly. Finally, there has been some strange behavior when running the app in
multiple windows while using BrowserSync.