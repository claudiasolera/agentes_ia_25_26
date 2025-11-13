

// -------- IMPORTACIONES --------

import { config } from "dotenv";
import { exec } from "child_process";
config(); // <-- ha cargado en process.env las variables
const API_URL= process.env.API_URL;



// -------- DECLARACIÓN DE VARIABLES --------
// así hay que hacer las funciones para que funcione y no solo se imprima la peticion

/**
 * Función que sirve para obtener todos los usuarios
 * 
 */
export const getAllUsers = () => {
    const URL_BASE= `${API_URL}/users`;
    const cmd = `curl -s -X GET ${URL_BASE}`;
    
    exec(cmd, (error, stdout, stderror) => {
        // solo me interesa el stdout
        if(error){
            console.error("Error ejecutando el curl --->", error.message);
            return;
        }
        if(stderror){
            console.error("Error en la salida --->", stderror);
            return;
        }
        const data= JSON.parse(stdout);
        console.log(data);
        console.table(data);
    });

}