const user = {
    "nombre":"Claudio",
    "apellido1":"Peña",
    "apellido2":"Barragán",
    "edad" : 47,             //podemos agregar mas atributos 5
    "nickname": "isc_cpb",
    "hobbies": ["jugar","programar","comer"],    //podemos agregar una lista o arreglos 5
    "direccion": {
    "calle":"Avila Camacho 89",
    "ciudad": "Gurierrez Zamora"
    },    //podemos agregar dentro del objeto otro objeto 5
    "casado":false,
    saludar(){
        return "hola mundo" 
    }//podemos agregar metodos al objeto tipo de dato no valido 7
}

const amigos = [
    {nombre:"Kevin",nickname: "kev123"},
    {nombre:"Brayam",nickname: "bray123"},
    {nombre:"Jostin",nickname: "jos123"},
    {nombre:"Pedro",nickname: "pedro123"},
    {nombre:"Lucas",nickname: "luc123"},
    {nombre:"Juan",nickname: "juan123"}
] //'demos crear una lista de amigos 8

user.amigos = amigos

let salida = ''; // creamos una variable donde
//  se cada uno de los elementos de la lista amigos 10

console.log(user);
console.log(JSON.stringify(user)); //convierte un objeto de javascript a JSON 2
console.log(user.nombre);    //podemos acceder a distints valores del objeto 6
console.log(user.apellido1);
console.log(user.hobbies);

//console.log(user.saludar); //imprime la funcion 7
