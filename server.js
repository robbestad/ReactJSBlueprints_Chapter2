var  express = require("express");
var  browserify  = require('browserify-middleware');
var  babelify = require("babelify");
var  browserSync = require('browser-sync');
var  app = express();
var  port = process.env.PORT || 8080;
var path = require("path");
browserify.settings({
  transform: [babelify.configure({
  })],
  presets: ["es2015", "react"],  
  extensions: ['.js', '.jsx'],
  grep: /\.jsx?$/
});

app.get(
  '/bundle.js', 
  browserify(__dirname+'/source/app.jsx')
);

app.use(express.static('./public/'));

app.use('/*', express.static('./public/index.html'));

app.listen(port,function(){
  browserSync({
    proxy: 'localhost:' + port,
    files: [
      'source/**/*.{jsx,js}',
      'public/**/*.{css}'
    ],
    options: {
      ignored: 'node_modules'
    }
  });
});
