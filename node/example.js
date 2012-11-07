var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n' + '__dirname = ' + __dirname + '\nFile contents: ' + fs.readFileSync(__dirname + '/example.txt', 'utf8' ) );
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');