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
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    mostrarCarrito();
    funcionamientoBotones();
    actualizarTotal();
    finalizarCompra();
});


//Carga productos en el LocalStorage
function cargarCarrito(){
    document.addEventListener("click", (event) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if(event.target.classList.contains("agregarProducto")){
            const idt = event.target.closest('article').dataset.id;
            const elemento = productos.find((producto) => producto.id == idt);
            const productoExiste = carrito.find((item) => item.id == elemento.id);

            if(productoExiste){
                productoExiste.cantidad += 1;
            }
            else{
                const {id, image, producto, precio, cantidad} = elemento;
                const item = {
                    id: id,
                    image: image,
                    producto: producto,
                    precio: precio,
                    cantidad: 1
                };
                carrito.push(item);
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

    
    })
}

//Muestra visualmente los productos
function mostrarCarrito() {
    const itemsCarrito = document.querySelector("#comprasCarrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    itemsCarrito.innerHTML = "";
    
    if (carrito.length === 0) {
        itemsCarrito.innerHTML = "<h2>No hay productos en tu carrito</h2>";
    }
    else{ 
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
                                <p class="cantidadProductos">${item.cantidad}</p>
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
    actualizarTotal();
    actualizarContador();
}


function funcionamientoBotones(){
    document.addEventListener("click", (event) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if(event.target.classList.contains("continuarCompra")){
            window.location.href = './productos.html';
        }
        
        const id = event.target.closest('.itemsCarrito').dataset.id;
        const producto = carrito.find((item) => item.id == id);

        //Disminuir cantidad
        if(event.target.classList.contains("disminuir")){
            if(producto.cantidad >= 2){
                producto.cantidad -= 1;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarCarrito();
            }
        }

        //Aumentar cantidad
        if(event.target.classList.contains("aumentar")){
            producto.cantidad += 1;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        //Eliminar producto del carrito
        if(event.target.classList.contains('eliminar')){
            let nuevoCarrito = carrito.filter((item) => item.id != id);
            localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
            mostrarCarrito();
        }
    
    });
}


function actualizarTotal(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrecio = document.querySelector('#totalPrecio');
    let subtotalPrecio = document.querySelector('#subtotalPrecio');
    let total = 0;
    let decimales = 2;

    if(carrito.length >= 1){
        carrito.forEach((producto) => {
            total += producto.precio * producto.cantidad;
        });
        decimales = 3;
    
    }
    totalPrecio.textContent = "$" + total.toFixed(decimales);
    subtotalPrecio.textContent = "$" + total.toFixed(decimales);
    
}

function actualizarContador(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.querySelector('.contador');
    let cantidad = 0;

    if(carrito.length >= 1){
        carrito.forEach((producto) => {
            cantidad += producto.cantidad;
        })
        contador.textContent = cantidad.toString();
        contador.style.display = 'inline-block';
    }
    else{
        console.log("Carrito vacío, ocultando contador");
        contador.style.display = 'none';
    }
    
}

//Funcionamiento modal
function finalizarCompra(){
    const abrirModal = document.querySelector('.finalizarCompra');
    const modal = document.querySelector('.modal');
    const cerrarModal = document.querySelector('.modalCierre');

    abrirModal.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.add('modal--mostrar');
    });

    cerrarModal.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('modal--mostrar');
    });
}






