// el fichero cliente lanzara peticiones a la API REST

// *** como es funcion asíncrona le pongo async
// async --> await
// cunado es una función : async function traerVinos ...
export const traerPostVinos =  async() => {
    try {
        const response =await fetch("http://192.168.70.145:4000/posts");
        const data = await res.json();
        console.log(data);
    } catch(error){
        console.error("Error al traer los posts:", error);
    }
};
traerPostVinos();