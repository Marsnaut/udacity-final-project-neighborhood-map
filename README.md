# Neighborhood-Map-React

## Overview:
This is a SPA that uses React, and both the Google/Foursquare APIs. This is a list of five colleges/universities in NYC and you can click into the markers as well as filter it using a list

## Technologies & Packages:
* [React:](https://reactjs.org) Front end-framework
* [Foursquare API:](https://developer.foursquare.com/) Retrieving basic information about the location
* [Google Maps JS API:](https://developers.google.com/maps/documentation/javascript/tutorial) Rendering map and markers for a visual interface
* [Material UI:](https://material-ui.com/) React components that implement Google's Material Design

## Start the App:
* Git clone this file and then cd into it.
* Run `npm install` to download all dependencies
* After all the dependencies are downloaded and installed, type `npm start` to automatically open the app.

## API Keys:
* In components, `Map.js` and `List.js` are entry points for the API keys. You do not need a Google Maps will send an error but default to an developer view (With watermarks) but you will require one for Foursquare
* If you have your own API key, you can go to create an `.env` file to store your keys as an environment variable. If you have issues, both `Map.js` and `List.js` have additional string fields where you can input it manually


## Notes:
* It is recommended that you use Chrome as your browser.
* The browser will automatically open the Neighborhood Map App when you run `npm start`
* The server is configured properly thanks to [Create-React-App](https://github.com/facebook/create-react-app) but if there is a loading error, feel free to navigate directly to [http://localhost:3000/](http://localhost:3000/)
