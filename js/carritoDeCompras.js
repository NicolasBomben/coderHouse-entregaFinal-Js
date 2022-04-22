const items = document.getElementById("card-items");
const carritoItems = document.getElementById("carrito-items");
const mostrarFooter = document.getElementById("carrito-footer");
const carritoTemplate = document.getElementById("carrito-template").content;
const footerCarrito = document.getElementById("footer-template").content;
const template = document.getElementById("card-template").content;
const fragment = document.createDocumentFragment();
let carrito = {};

//llamo la data con fetch
const traerData = async () => {
    try {
        const res = await fetch('../data/api.json');
        const data = await res.json();
        mostrarCards(data);
        //console.log(data);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    traerData();

    //localstorage
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        mostrarCarrito();
    }

});

items.addEventListener('click', (e) => {
    agregarAlCarrito(e);
});

carritoItems.addEventListener('click', (e) => {
    //aumentar y disminuir items en el carrito
    accionesCarrito(e);
});



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

//funcion para agregar items al carrito
const agregarAlCarrito = e => {
    if(e.target.classList.contains("btn")){
        manipularCarrito(e.target.parentElement);
    }
    Toastify({
        text: "Agregado al Carrito",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "black",
          color: "#c2ff05"
        },
        onClick: function(){} // Callback after click
      }).showToast();
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

    //almacenar items en localstorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//funcion para mostrar el carrito y sus items cuando se van agregando
const mostrarFooterCarrito = () => {

    mostrarFooter.innerHTML = ``

    if(Object.keys(carrito).length === 0){
        mostrarFooter.innerHTML = `
        <th>Carrito Vacio - Comience a comprar</th>
        `
        return;
    }

    const sumarCantidades = Object.values(carrito).reduce((acumular, {cantidad})=> acumular + cantidad, 0);
    const sumarPrecios = Object.values(carrito).reduce((acumular, {cantidad,precio}) => acumular + cantidad * precio, 0);
    
    footerCarrito.querySelectorAll("td")[0].textContent = sumarCantidades;
    footerCarrito.querySelector("span").textContent = sumarPrecios;

    const clonar = footerCarrito.cloneNode(true);
    fragment.appendChild(clonar);
    mostrarFooter.appendChild(fragment);

    const vaciarCarrito = document.getElementById("vaciar-carrito");
    vaciarCarrito.addEventListener("click", () => {
        carrito = {}
        mostrarCarrito();
        Toastify({
            text: "Ups parece que te arrepentiste",
            duration: 4000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "black",
              color: "white",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    });

    const comprar = document.getElementById("realizar-compra");
    comprar.addEventListener("click", () => {
        carrito = {};
        mostrarCarrito();
        Toastify({
            text: "Compra realizada con exito, te llegara un email con el numero de seguimiento. Gracias por tu compra",
            duration: 4000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "black",
              color: "white",
              width: "300px",
              height: "150px"
            },
            onClick: function(){} // Callback after click
          }).showToast();
    });

}

//funcion para restar o sumar items en el carrito
const accionesCarrito = (e) => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-sumar')){

        const producto = carrito[e.target.dataset.id];
        producto.cantidad ++;
        carrito[e.target.dataset.id] = {...producto};
        
        mostrarCarrito();
    }

    if(e.target.classList.contains('btn-restar')){

        const producto = carrito[e.target.dataset.id];
        producto.cantidad --;

        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id];
        }

        mostrarCarrito();
    }

    e.stopPropagation();
}
