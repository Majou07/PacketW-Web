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
