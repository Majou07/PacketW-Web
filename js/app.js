const BASE_URL = "http://localhost:8080/APIRestPW/api/"; 

async function buscarEnvio() {
    const guia = document.getElementById("txtGuia").value.trim();
    
    limpiarInterfaz();

    if (!guia) {
        mostrarError("Por favor ingresa un número de guía.");
        return;
    }

    try {
        const responseEnvio = await fetch(`${BASE_URL}envio/buscar-guia/${guia}`);

        if (!responseEnvio.ok) {
            throw new Error("No se encontró el envío con esa guía.");
        }

        const dataEnvio = await responseEnvio.json();

        const responseHistorial = await fetch(`${BASE_URL}envio/historial/${dataEnvio.idEnvio}`);
        const dataHistorial = responseHistorial.ok ? await responseHistorial.json() : [];

        const responsePaquetes = await fetch(`${BASE_URL}paquete/obtener-por-envio/${dataEnvio.idEnvio}`);
        const dataPaquetes = responsePaquetes.ok ? await responsePaquetes.json() : [];

        renderizarDatos(dataEnvio, dataHistorial, dataPaquetes);

    } catch (error) {
        mostrarError(error.message);
        console.error("Error en la búsqueda:", error);
    }
}

function renderizarDatos(envio, historial, paquetes) {
    const divResultados = document.getElementById("resultados");

    document.getElementById("lblOrigen").textContent = envio.sucursalOrigen || "No asignada";

    const direccionCompleta = `${envio.destinoCalle} #${envio.destinoNumero}, Col. ${envio.destinoColonia}, ${envio.destinoCiudad}, ${envio.destinoEstado} CP: ${envio.destinoCodigoPostal}`;
    document.getElementById("lblDestino").textContent = direccionCompleta;

    document.getElementById("lblEstado").textContent = envio.estatusEnvio;

    const listaPaquetes = document.getElementById("listaPaquetes");
    listaPaquetes.innerHTML = "";
    
    if (paquetes && paquetes.length > 0) {
        paquetes.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.descripcion} - ${p.peso}kg - ${p.alto}x${p.ancho}x${p.profundidad}cm`;
            listaPaquetes.appendChild(li);
        });
    } else {
        listaPaquetes.innerHTML = "<li>No hay paquetes detallados en este envío.</li>";
    }

    const listaHistorial = document.getElementById("listaHistorial");
    listaHistorial.innerHTML = "";

    if (historial && historial.length > 0) {
        historial.forEach(h => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${h.estatus}</strong>
                <br><small>${h.fechaCambio}</small>
                <br><span style="color:#666; font-style:italic;">
                    "${h.comentario || 'Sin observaciones'}"
                </span>
            `;
            listaHistorial.appendChild(li);
        });
    } else {
        listaHistorial.innerHTML = "<li>No hay historial disponible.</li>";
    }

    divResultados.classList.remove("hidden");
}

function limpiarInterfaz() {
    const resultados = document.getElementById("resultados");
    const errorMsg = document.getElementById("errorMsg");
    if (resultados) resultados.classList.add("hidden");
    if (errorMsg) errorMsg.classList.add("hidden");
}

function mostrarError(mensaje) {
    const divError = document.getElementById("errorMsg");
    if (divError) {
        divError.textContent = mensaje;
        divError.classList.remove("hidden");
    }
}