class Producto{

    constructor(nombre,precio,talle) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.talle = talle;
    }

}

//declaro array vacio donde se van a ir guardando las cargas de productos.
const productos = [];

//uso metodo push para almacenar los productos que estan disponibles en la tienda.
productos.push(new Producto("Remera Basica Negra", 2800, "M,L"));
productos.push(new Producto("Morral 01", 1800, ""));
productos.push(new Producto("Pantalon Jogger Estampado", 5000, "M,L,XL"));
productos.push(new Producto("Remera Basica Blanca", 2800, "M,L"));
productos.push(new Producto("Gorra Color Block", 1500, ""));
productos.push(new Producto("Pantalon Soft Denim Acid", 4500, "M,L,XL"));

console.log(productos);

//let contador = 0;

/*window.addEventListener("load", () =>{
    for(let i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i);
        let producto = localStorage.getItem(clave);
        productos.push(JSON.parse(producto));
        contador = i + 1;
    }
});*/
//muestro los productos por HTML mediante manipulacion del DOM.
    const containerProductos = document.getElementById("contenedor")
    for( let p of productos){
        let productoHtml = document.createElement("div")
        productoHtml.className = "container-cards";
        productoHtml.innerHTML = `
        <div class="card">
                      <div class="image-container">
                          <img class="card-image" src="../images/${p.nombre}.jpeg" alt="${p.nombre}"/>
                      </div>
                      <div class="card-description">
                        <h3>${p.nombre}</h3>
                        <h3>${p.precio}</h3>
                        <h4>${p.talle}</h4>
                        <br>
                        <button class="btn">AGREGAR</button>
                      </div>
                  </div>
        `;
        containerProductos.appendChild(productoHtml);
}

