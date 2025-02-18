const user = {
    "nombre":"Claudio",
    "apellido1":"Peña",
    "apellido2":"Barragán",
    "edad" : 47,             //podemos agregar mas atributos 5
    "nickname": "isc_cpb",    //podemos agregar mas atributos 5
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

    user.amigos = amigos; //agrgamos al usuario la lista de amigos 9

    

    let salida = ''; // creamos una variable donde se cada uno de los elementos de la lista amigos 10

    for (let i = 0; i < amigos.length; i++) {
        salida = salida + `<li>${amigos[i].nombre}</li>`
       //salida = salida + `<li>${amigos[i].nombre} - ${amigos[i].nickname} </li>`        
    } //cremos un for para recorrer la lista de amigoa y guardarla en salida y concatenarla para que los
      //agrege cada uno

    document.getElementById('amigos').innerHTML = salida;
    // accede a documento en la lista (ul) del html con id ="amigos" y le agraga el codigo html
    //(<li>${amigos[i].nombre}</li>) al elemento de la lista (ul) alterando el DOM del index.html

//console.log(user) //Imprime el objeto 1
//JSON.stringify(user); //convierte un objeto de javascript a JSON 2
console.log(JSON.stringify(user)); //imprime el objeto en formato JSON 3,9

// https://jsonlint.com/ esta pagina ayuda a verificar si el JSON es valido 4

//console.log(user.nombre);    //podemos acceder a distints valores del objeto 6
//console.log(user.apellido1);
//console.log(user.hobbies);

//console.log(user.saludar); //imprime la funcion 7


//vamos a usar una api un json en internet para mostrarlo en el html
// 1.- entrar a https://jsonplaceholder.typicode.com/
// 2.- bajar hasta encontrar resources.
// 3.- seleccionar /posta   100 posts

let publicacion = '';



fetch('https://jsonplaceholder.typicode.com/posts')
.then(resp => {
    return resp.json()
})
.then(data => {
    console.log(data);
    for(i=0; i < data.length; i++){
        publicacion = publicacion + `<li>${data[i].userId} - ${data[i].title}</li>`
    }
    document.getElementById('post').innerHTML = publicacion
})

