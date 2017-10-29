var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 8080,               // optional, defaults to a random port
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
});

server.start(function () {
	console.log('Server listening to', server.port);
});