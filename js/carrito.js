class Producto{

    constructor(id,nombre,precio,talle) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.talle = talle;
    }

}


//declaro array vacio donde se van a ir guardando las cargas de productos.
const productos = [];

console.log(productos);

//uso metodo push para almacenar los productos que estan disponibles en la tienda.
productos.push(new Producto(1,"Remera Basica Negra", 2800, "M,L"));
productos.push(new Producto(2,"Morral 01", 1800, ""));
productos.push(new Producto(3,"Pantalon Jogger Estampado", 5000, "M,L,XL"));
productos.push(new Producto(4,"Remera Basica Blanca", 2800, "M,L"));
productos.push(new Producto(5,"Gorra Color Block", 1500, ""));
productos.push(new Producto(6,"Pantalon Soft Denim Acid", 4500, "M,L,XL"));


//utilizo un for of para recorrer el array y DOM para visualizar en pantalla los productos.
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
                        <button class="btn" id="btnAgregar">AGREGAR</button>
                      </div>
                  </div>
        `;
        containerProductos.appendChild(productoHtml);

        
}

//declaro array de carrito donde se guardar los productos agregados.
const carrito = [];

//id Storage
//let contador = 0;

const botonAgregar = document.getElementById("btnAgregar");
//funcion al cargar la pagina y local storage
botonAgregar.addEventListener("click", (e) =>{
    for(let i = 0; i < productos.length; i++){
        carrito.push(e.target.productos);
    }
    //cargarListaProductos();
});

console.log(carrito);
