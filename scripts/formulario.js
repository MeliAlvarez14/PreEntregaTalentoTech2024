const formulario = document.querySelector("form");

formulario.addEventListener('submit', (evento) => {
    const correo = document.querySelector("#correoContacto");
    const errorCorreo = document.querySelector("#error");
    const telefono = document.querySelector("#telefonoContacto");
    const errorTel = document.querySelector("#errorTelefono");
    const consulta = document.querySelector("#consulta");

    let patronTel = /^[+]?\d{1,3}?[-.\s]?(\(?\d{2,3}\)?[-.\s]?)?[\d]{3}[-.\s]?[\d]{4}$/;
    let patronCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let errores = [];
    

    if(!patronCorreo.test(correo.value)){
        correo.style.border = '1px solid red';
        errorCorreo.style.color = "red";
        errorCorreo.style.fontSize = "10px";
        errorCorreo.textContent = "El correo ingresado no es válido";
        errores.push(("alerta"));
    }

    if(!patronTel.test(telefono.value)){
        telefono.style.border = '1px solid red';
        errorTel.style.color = "red";
        errorTel.style.fontSize = "10px";
        errorTel.textContent = "el número ingresado no es válido";
        errores.push(("alerta"));
    }

    if(consulta.value.length < 40){
        consulta.style.border = "1px solid red";
        errores.push(("alerta"));
    }


    if(errores.length == 0){
        correo.style.border = '1px solid green';
        telefono.style.border = '1px solid green';
        consulta.style.border = "1px solid green";
        errorCorreo.textContent = "el número ingresado no es válido";
        errorTel.textContent = "el número ingresado no es válido";
        formulario.submit();
    }
    else{
        evento.preventDefault();
    }
    
})

