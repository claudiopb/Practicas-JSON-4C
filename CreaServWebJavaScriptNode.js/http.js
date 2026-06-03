const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });

  response.write("Hola mi primes servidor con javascipt");

  response.end();
}).listen(8081);
