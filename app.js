const http = require('http');
const port = 8080;
http.createServer(function(request, response){
  console.log('HTTP server start on port ' + port);

  response.writeHead(200, {'Content-type': 'text/plan'});
  response.write('Hello Node World!');

  response.end( );
}).listen(port);