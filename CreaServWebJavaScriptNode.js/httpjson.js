let index = (request,respose) => {
    respose.statusCode = 200;
    respose.writeHead(200);

    respose.end("Hola mundo! desde 'index' - end(). ");
};

let indexJSON = (request,respose) => {
    respose.setHeader('Content-Type','application/json');
    respose.writeHead(200);

    respose.end("mensaje":"Contenido en formato JSON.");
};

const server = http.createServer(request,respose) => {
    console.log(request.url);
    console.log(respose.method);

    if(request)
}