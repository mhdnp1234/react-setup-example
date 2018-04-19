const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config.dev');
const open = require('open');
const busboy = require('express-busboy');
/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
// common middleware
 
busboy.extend(app, {
  upload: true,
  path: './tmp',
  allowedPath: /./,
});
//development middlware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../app/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});