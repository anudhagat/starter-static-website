#Webpack Starter Kit for Static Website
This kit uses npm for dependency management. It also uses a simple express server to display all html files during development.

## Installation
Git clone this repository using this command:
```
git clone https://github.com/anudhagat/starter-static-website.git
```
Run npm install. This also build the development version of html/css/js files in the public directory.
```
npm install
```

## Running the Development Server
To run the express server, run this command:
```
npm run start
```
This starts the website in a browser at localhost:3000.

## Rebuilding the Assets for Development
To rebuild the html/css/js files in the public directory, run the command:
```
npm run build
```

## Rebuilding the Assets for Production
To rebuild the html/css/js files in the public directory, run the command:
```
npm run prod
```

## Notes on How Assets are Processed
### Development Build

#### JS Files
Transpile all ES6 javascript files into ES2015 using the babel-loader.
Separate the common chunks into its own vendor bundle. Publish these into the public/js folder.

#### CSS and Sass Files
Compile all Sass files into css and add all the necessary prefixes using postcss-loader. Publish these into the public/css folder.

#### Html Files
Using html-webpack-plugin, inject css and js files into html templates and publish the html files in the public folder.
Using the reshape-loader, process all template files using reshape-layouts and reshape-include.

### Production Build

Minify all html, css and js files.
Uglify all js files.
Add hashes to the css and js files for cache busting and insert the changed hashes into the appropriate html file.
