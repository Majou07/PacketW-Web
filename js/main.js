document.getElementById('btnBuscar').addEventListener('click', async () => {
    const guia = document.getElementById('guiaInput').value;
    if (!guia) return alert("Ingresa un número de guía");

    const envio = await buscarEnvio(guia); 
    
    if (envio) {
        document.getElementById('resultadoContainer').classList.remove('hidden');
        
        document.getElementById('infoEnvio').innerHTML = `
            <p><strong>Cliente:</strong> ${envio.nombreCliente}</p>
            <p><strong>Destino:</strong> ${envio.destinoEstado}</p>
            <p><strong>Estado Actual:</strong> ${envio.estatusEnvio}</p>
        `;

        const paquetes = await obtenerPaquetes(envio.idEnvio);
        const lista = document.getElementById('listaPaquetes');
        lista.innerHTML = paquetes.map(p => `<li>${p.descripcion} (${p.peso} kg)</li>`).join('');

        const historial = await obtenerHistorial(envio.idEnvio);
        const cuerpo = document.getElementById('cuerpoHistorial');
        cuerpo.innerHTML = historial.map(h => `
            <tr>
                <td>${h.estatus}</td>
                <td>${h.fechaCambio}</td>
            </tr>
        `).join('');
    } else {
        alert("No se encontró información para esa guía.");
    }
});