async function cargarDatos(coleccion) {
    const response = await fetch(`/api/${coleccion}`);
    const datos = await response.json();
    
    const headers = document.getElementById('headers');
    const body = document.getElementById('body-datos');
    
    // 1. Limpiamos antes de empezar
    headers.innerHTML = "";
    body.innerHTML = "";

    // 2. Definimos las columnas y sus campos correspondientes (deben coincidir con tu JSON)
    const configuracion = {
        empleados: {
            titulos: ["Nombre", "Apellido P.", "Apellido M.", "Dirección", "Edad", "Género", "Puesto", "Sueldo"],
            campos: ["nombre", "apellido_paterno", "apellido_materno", "direccion", "edad", "genero", "puesto", "sueldo"]
        },
        clientes: {
            titulos: ["Nombre", "Apellido P.", "Apellido M.", "Dirección", "Teléfono"],
            campos: ["nombre", "apellido_paterno", "apellido_materno", "direccion", "telefono"]
        },
        productos: {
            titulos: ["Nombre", "Precio", "IVA", "Precio con IVA", "Caducidad","Fecha","CATEGORIA"],
            campos: ["nombre", "precio", "iva", "precio_con_iva", "fecha_caducidad","fecha_inventario","categoria"]
        }
    };

    const cfg = configuracion[coleccion];
    if (!cfg) return; // Si la colección no existe, no hacemos nada

    // 3. Pintamos cabeceras
    headers.innerHTML = cfg.titulos.map(t => `<th>${t}</th>`).join('');

    // 4. Pintamos los datos específicamente usando la lista 'campos'
    datos.forEach(item => {
        let fila = "<tr>";
        cfg.campos.forEach(campo => {
            // Si el campo existe lo pone, si no, pone un guion
            fila += `<td>${item[campo] || "-"}</td>`;
        });
        fila += "</tr>";
        body.innerHTML += fila;
    });
}