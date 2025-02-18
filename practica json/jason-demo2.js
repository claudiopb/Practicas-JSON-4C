let infoCurso = {
    "titulo":"Aprende Node.js",
    "numVistas":456789,
    "numLikes":21123,
    "temas":["JavaScript","Node.js"],
    "esPublico":true

}
//objeto -> a cadena de caracteres
// convertir formato json  a cadena de caracteres
let infoCursoJSON = JSON.stringify(infoCurso);

console.log(infoCursoJSON);
console.log(typeof infoCursoJSON);

//Cadena de caracteres -> json
// convertir una cadena de cracteres a json

let infoCursoObjeto = JSON.parse(infoCursoJSON);
console.log(infoCursoObjeto);
console.log(typeof infoCursoObjeto);