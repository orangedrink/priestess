<<<<<<< HEAD
var port = process.env.PORT || 8080;
var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: port,               // optional, defaults to a random port
=======
var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 8080,               // optional, defaults to a random port
>>>>>>> 386263d3a6f904dc6ced91fcf8c4cf5bdb2a003b
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
});

server.start(function () {
	console.log('Server listening to', server.port);
});