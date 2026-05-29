# Proyecto MVP App Supermercado

<a id="readme-top"></a>


<h1 align="center">Implementa Bases de Datos NO Relacioneales en Sistemas Informaticos CBTis-191</h1>
Diseño de una App Web de una supermercado utilizando HTML, CSS, NodeJs y MongoBD  4° sem C CBTis 191
<h1 align="center">Hola Soy, Claudio Peña Barragán 👋</h1>
<p align="center">
 <a href="https://github.com/DenverCoder1/readme-typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=00FFFF&center=true&vCenter=true&width=500&height=100&lines=Ing.+en+Sistemas+Computacionales;Especialista+en+Python;CBTis+191+Nicolas+Bravo;Desarrollador+Full+Stack">
</a>
</p>

## Índice de secciones:

---

<details>
<summary><strong>Introducción </strong></summary>
Se presenta el ejemplo de una aplicación web sencilla que ilustra el uso de tecnologías como HTML para el frontend, Node.js para el backend y MongoDB para la persistencia de datos mediante bases de datos no relacionales.

 <p align="center">
  <img src="proyecto_mvp_node&mongo/assets/esquemabdsuper.png" alt="Webwright logo" width="320">
</p>
</details>

---

<details>
<summary><strong>Paso 1 json de las colecciones empleados, clientes y productod  </strong></summary>

## Cómo importar en MongoDB Compass:
<ol>
  <li>Abre Compass y conéctate a tu servidor local (mongodb://localhost:27017)</li>
  <li>Crea la base de datos supermercado_db (botón + al lado de "Databases")</li>
  <li>Al crear la DB, también crea la primera colección (empleados)</li>
  <li>Entra a la colección → botón Add Data → Import JSON file → selecciona empleados.json</li>
  <li>Repite el proceso para clientes y productos</li>
  <li>Elemento 3</li>
</ol>
<p>
Un par de notas sobre las decisiones de diseño: el teléfono se guardó como String (no Number) para que los números con cero inicial no se pierdan. El campo precio_con_iva se guardó precalculado para agilizar las consultas, aunque en MongoDB también podrías calcularlo dinámicamente con una aggregation pipeline.
</p> 
<a href="https://github.com/claudiopb/Practicas-JSON-4C/blob/main/proyecto_mvp_node%26mongo/empleados.json">- empleados.json</a><br>
<a href="https://github.com/claudiopb/Practicas-JSON-4C/blob/main/proyecto_mvp_node%26mongo/clientes.json">- clientes.json</a><br>
<a href="https://github.com/claudiopb/Practicas-JSON-4C/blob/main/proyecto_mvp_node%26mongo/productos.json">- productos.json</a><br>

</details>

---



