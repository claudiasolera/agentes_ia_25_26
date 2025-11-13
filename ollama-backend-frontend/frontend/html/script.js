
document.getElementById('btnModelos').addEventListener('click', async() =>{
    try{
        // const response = await fetch("http://localhost:3002/api/modelos");
        const response = await fetch('/api/consulta', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            signal: AbortSignal.timeout(5000),
        });
        if(!response.ok){
            throw new Error(`Error fetching modelos: ${response.statusText}`);
        }
        const data = await response.json();
        console.table(data.modelos);
        const nombreModelos = data.modelos.map((modelo)=>modelo.name);

        // seleccionamos el párrafo donde mostrar los modelos
        document.getElementById('mostrarModelos').textContent =
        nombreModelos.join(", ");

    }catch(error){
        console.error('Error fetching modelos:', error);
        // document.getElementById('modelos');
    }
});