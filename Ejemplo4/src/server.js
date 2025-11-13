// Este fichero se va a encargar de levantar una API REST con Express


// ----- IMPORTACIONES -----

//import
import { config } from 'dotenv';
import express from 'express';
import { dataAPI } from './db/db.js';
import cors from "cors";

// variables de entorno
config();

const PORT = process.env.PORT || 4001;
const NODE_ENV= process.env.NODE_ENV;
const SERVER_URL = process.env.SERVER_URL || "http://localhost";
const HOST = process.env.HOST;


// ----- INICIO DE LA APLICACIÓN -----

const app = express();



//       CORS 

// voy apermitir cors
app.use(cors());

// voy a permitir JSON como cuerpo de peticiones
app.use(express.json);

// midleware (intermediario)
app.use((require,response,next) => {
    const timeData = new Date().toISOString();
    console.log(`${timeData} ${require.method} ${require.url} -IP ${require.ip}`);
    next();
});



// Bienvenida

app.get('/', (require,responde) => {
    responde.send(
        {
            message:"Mini API de post de alumnos",
            version: "1.0.0",
            endpoint: {
                "GET /libros" : "Obtiene todos los libros de mi API"
            }
        }
    );
});

app.get("/libros", (require,response) => {
    console.log("Petición GET para traer los libros de mi api")
    response.json({
        succes: true,
        data: dataAPI,
        // para que se autoincrementen : count:libros.length
        count: dataAPI.length,
    });
});

app.delete("/libros/id", (requ,res)=> {
    console.log("Petición DELETE para eliminar un libro de mi api");
    res.json({
        succes: true,
        data: `${dataAPI}/id`,
    });
});


// ----- INICIAR EL SERVIDOR -----

app.listen(PORT, HOST, () => {
    console.log(`Servidor de Claudia -->  ${HOST}:${PORT} `);
})

// hacer un crud, un fichero js