//Comportamiento de la página
visualizarProductos();
//

//let elementos;

async function visualizarProductos(){
    try{
        const response = await fetch('./scripts/listaProductos.json');
        const array = await response.json();

        const listaProductos = document.querySelector("#listaProductos");
        listaProductos.innerHTML = "";
        array.forEach((item) => {
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
        <article class="${item.class}" data-id="${item.id}">
            <img src="./img/${item.image}" alt="${item.producto}">
            <p>${item.producto}</p>
            <h3>$${item.precio}</h3>
            <button type="button" class="agregarProducto">Agregar al carrito</button>
        </article>
        `
    return html;
};


