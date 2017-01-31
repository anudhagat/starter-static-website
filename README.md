#Webpack Starter Kit for Static Website
This kit uses npm for dependency management. It also uses a simple express server to display all html files during development.

## Installation
Git clone this repository and do an npm install.
```git clone https://github.com/anudhagat/starter-static-website.git
```
Do an ```npm install``` in this cloned repository.
For development, do ```npm run build``` to build all files into the public folder.
To run the express server, type ```npm run start```.

## Development

### JS Files
Transpile all ES6 javascript files into ES2015 using the babel-loader.
Separate the common chunks into its own vendor bundle. Publish these into the public/js folder.

### CSS and Sass Files
Compile all Sass files into css and add all the necessary prefixes using postcss-loader. Publish these into the public/css folder.

### Html Files
Using html-webpack-plugin, inject css and js files into html templates and publish the html files in the public folder.

## Production

Minify all html, css and js files.
Uglify all js files.
Add hashes to the css and js files for cache busting and insert the changed hashes into the appropriate html file.
