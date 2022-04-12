const items = document.getElementById("card-items");
const carritoItems = document.getElementById("carrito-items");
const mostrarFooter = document.getElementById("carrito-footer");
const carritoTemplate = document.getElementById("carrito-template").content;
const footerCarrito = document.getElementById("footer-template").content;
const template = document.getElementById("card-template").content;
const fragment = document.createDocumentFragment();
let carrito = {};


document.addEventListener('DOMContentLoaded', () => {
    traerData();
});

items.addEventListener('click', (e) => {
    agregarAlCarrito(e);
});

//llamo la data con fetch
const traerData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        mostrarCards(data);
        //console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//funcion para mostrar cards con su data por pantalla.
const mostrarCards = data => {
    data.forEach(producto => {
        //obtengo cada parte de la card que necesito y le paso lo que debe mostrar
        template.querySelector("img").setAttribute("src", producto.imagenURL);
        template.querySelector("h3").textContent = producto.nombre;
        template.querySelector("h4").textContent = producto.precio;
        template.querySelector("p").textContent = producto.talle;
        template.querySelector(".btn").dataset.id = producto.id;


        const clonar = template.cloneNode(true);
        fragment.appendChild(clonar);
    })
    items.appendChild(fragment);
}

const agregarAlCarrito = e => {
    //console.log(e.target);
    //console.log(e.target.dataset.id);(e.target.classList.contains("btn"));
    if(e.target.classList.contains("btn")){
        manipularCarrito(e.target.parentElement);
    }
    e.stopPropagation()
}

const manipularCarrito = obj => {
    //obtengo el id del boton
    const producto = {
        id: obj.querySelector(".btn").dataset.id,
        nombre: obj.querySelector("h3").textContent,
        precio: obj.querySelector("h4").textContent,
        cantidad: 1,
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto};
    
    mostrarCarrito();
}

//funcion para mostrar lo seleccionado del carro
const mostrarCarrito = () => {
    //console.log(carrito);
    carritoItems.innerHTML = ``;

    Object.values(carrito).forEach( producto => {

        carritoTemplate.querySelector("th").textContent = producto.id,
        carritoTemplate.querySelectorAll("td")[0].textContent = producto.nombre,
        carritoTemplate.querySelectorAll("td")[1].textContent = producto.cantidad,
        carritoTemplate.querySelector(".btn-sumar").dataset.id = producto.id,
        carritoTemplate.querySelector(".btn-restar").dataset.id = producto.id
        carritoTemplate.querySelector("span").textContent = producto.cantidad * producto.precio
        const clonar = carritoTemplate.cloneNode(true);
        fragment.appendChild(clonar);

    });

    carritoItems.appendChild(fragment);

    mostrarFooterCarrito();
}

const mostrarFooterCarrito = () => {

    mostrarFooter.innerHTML = ``

    if(Object.keys(carrito).length === 0){
        mostrarFooter.innerHTML = `
        <th>Carrito Vacio - Comience a comprar</th>
        `
    }

    const sumarCantidades = Object.values(carrito).reduce((acumular, {cantidad})=> acumular + cantidad, 0);
    const sumarPrecios = Object.values(carrito).reduce((acumular, {cantidad,precio}) => acumular + cantidad * precio, 0);
    
    footerCarrito.querySelectorAll("td")[0].textContent = sumarCantidades;
    footerCarrito.querySelector("span").textContent = sumarPrecios;

    const clonar = footerCarrito.cloneNode(true);
    fragment.appendChild(clonar);

    mostrarFooter.appendChild(fragment);

}