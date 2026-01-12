const BASE_URL = "http://localhost:8080/APIRestPW/api/"; 

async function buscarEnvio(guia) {
    try {
        const response = await fetch(`${BASE_URL}envio/${guia}`);
        if (!response.ok) throw new Error("Envío no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function obtenerPaquetes(idEnvio) {
    const response = await fetch(`${BASE_URL}paquete/obtener-por-envio/${idEnvio}`);
    return await response.json();
}

async function obtenerHistorial(idEnvio) {
    const response = await fetch(`${BASE_URL}envio/historial/${idEnvio}`);
    return await response.json();
}


response.addHeader("Access-Control-Allow-Origin", "*");
response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
