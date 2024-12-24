//Comportamiento de la página
visualizarProductos();



let productos;

async function visualizarProductos(){
    try{
        const response = await fetch('./scripts/listaProductos.json');
        productos = await response.json();

        const listaProductos = document.querySelector("#listaProductos");
        listaProductos.innerHTML = "";
        productos.forEach((item) => {
            const productos = crearProducto(item);
            listaProductos.innerHTML += productos;
        });

    }
    catch(error){
        console.error(error);
    }
};


function crearProducto(item){
    const html = `
        <article data-id="${item.id}">
            <img src="./img/${item.image}" alt="${item.producto}">
            <p>${item.producto}</p>
            <h3>$${item.precio}</h3>
            <button type="button" class="agregarProducto">Agregar al carrito</button>
        </article>
        `
    return html;
};


//Carrito de compras
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
});

document.addEventListener("click", (event) => {
    if(event.target.classList.contains("agregarProducto")){
        const idt = event.target.closest('article').dataset.id;
        const elemento = productos.find((producto) => producto.id == idt);

        const {id, image, producto, precio} = elemento;
        const item = {
            id: id,
            image: image,
            producto: producto,
            precio: precio
        };
        carrito.push(item);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    //Eliminar producto
    if(event.target.classList.contains("eliminar")){
        const id = event.target.closest('.itemsCarrito').dataset.id;
        let nuevo = carrito.filter((producto) => producto.id != id);

        localStorage.setItem("carrito", JSON.stringify(nuevo));
        cargarCarrito();
    }
    
});


function cargarCarrito() {
    const itemsCarrito = document.querySelector("#comprasCarrito");
    
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = "<h2>No hay productos en tu carrito</h2>";
    }
    else{
        itemsCarrito.innerHTML = "";
    
        carrito.forEach((item) => {
            const html = `
                    <div class="itemsCarrito" data-id="${item.id}">
                        <div class="presentacion">
                            <img src="./img/${item.image}" alt="${item.producto}">
                        </div>
                        <div class="selectoresCantidad">
                            <p>${item.producto}</p>
                            <div class="botones">
                                <button class="disminuir">-</button>
                                <p class="cantidadProductos"></p>
                                <button class="aumentar">+</button>
                            </div>                            
                        </div>
                        <div class="eliminarYPrecio">
                            <p>$${item.precio}</p>
                        <button class="eliminar">Eliminar</button>
                        </div>
                    </div>
            `;

            itemsCarrito.innerHTML += html;
    });

    }
}






/*
//Detalle de carrito
const itemsCarrito = document.querySelector("#comprasCarrito");

itemsCarrito.innerHTML = "";

carrito.forEach((item) => {
    const html = `
        <div class="itemsCarrito" data-id="${item.id}">
            <img src="./img/${item.image}" alt="${item.producto}">
            <p>${item.producto}</p>
            <div class="botones">
                <div class="selectoresCantidad">
                    <button class="disminuir">-</button>
                    <p class="cantidadProductos"></p>
                    <button class="aumentar">+</button>
                </div>
                <button class="eliminar">Eliminar</button>
            </div>
            <p>$${item.precio}</p>
        </div>
    `;

    itemsCarrito.innerHTML += html;
});
*/








