class Producto{

    constructor(nombre,precio,talle) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.talle = talle;
    }

}

//declaro array vacio donde se van a ir guardando las cargas de productos.
const productos = [];

//uso metodo push para almacenar
productos.push(new Producto("remera", 2500, "L"));
productos.push(new Producto("jean", 3500, "M"));
productos.push(new Producto("hoodie", 5000, "XL"));
productos.push(new Producto("pantalon", 3000, "S"));
productos.push(new Producto("gorra", 1500, "M,L"));


//buscar un producto por nombre previamente guardado.
let buscarProducto = prompt("Ingrese el nombre del producto que desea buscar");
let productoIngresado = productos.filter(producto => producto.nombre.includes(buscarProducto));

alert("Su resultado de busqueda es" + JSON.stringify(productoIngresado));


//cargar nuevo producto
let cargarProducto = prompt("Si desea puede ingresar nuevos productos");
let agregarNombre = prompt("Ingrese el nombre del nuevo producto");
let agregarPrecio = prompt("Ingrese el precio del nuevo producto");
let agregarTalle = prompt("Ingrese el talle del nuevo producto");
productos.push(new Producto(agregarNombre, agregarPrecio, agregarTalle));

alert("Carga con exito!");

console.log(productos);


//uso el for of para recorrer el array y creo un contenedor para mostrar la data. Se muestran los productos previamente guardados y el agregado.
for(let p of productos){
    // creo un div donde se van a mostrar los productos.
    let contenedor = document.createElement("div");
    // uso el innerHTML para mostrar la lista.
    contenedor.innerHTML = `<h3> Nombre: ${p.nombre}</h3>
                            <p> Precio $: ${p.precio}</p>
                            <p> Precio $: ${p.talle}</p>`;
    document.body.appendChild(contenedor);
}