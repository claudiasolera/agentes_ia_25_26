import dotenv from 'dotenv';
import { exec } from "child_process";
dotenv.config();

const PORT= process.env.PORT;
const API_BASE_URL = process.env.API_BASE_URL;
const BASE_URL = `${API_BASE_URL}:${PORT}`;

/**
 * Recibe el comando cURL y lo inicia en la terminal
 * @param {String} cmd - Comando cURL
 */
export function runCommand(cmd){
    exec(cmd, (error, stdout, stderror) => {
        
        if(error){
            console.error("Error ejecutando el curl --->", error.message);
            return;
        }
        if(stderror){
            console.error("Error en la salida --->", stderror);
        }
        console.log(stdout);
    });
}


/**
 * Recibe objeto con datos del estudiante e imprime comando CREATE
 * @param
 */
export function createStudent(studentData){
    const jsonData = JSON.stringify(studentData);
    const cmd= `curl -i -X POST "${BASE_URL}/students" -H "Content-Type: application/json" -d "${jsonData.replace(/"/g, '\\"')}"`;
    runCommand(cmd);
}

/**
 * Imprimer comando para leer todos los estudiantes (sin parámetros)
 */
export function readAllStudents(){
    const cmd = `curl -i -X GET "${BASE_URL}/students"`;
    runCommand(cmd);
}

/**
 * Recibe el ID del estudiante, imprime comando para leerlo
 * @param {number} id - Id del estudiante
 */
export function readStudentById(id){
    const cmd = `curl -i -X GET "${BASE_URL}/students/${id}"`;
    runCommand(cmd);
}

/**
 * Recibe ID y datos completos, imprime comando PUT
 * @param {number} id - Id del estudiante
 * @param {Object} studentData - Objecto con los datos del estudiante
 */
export function updateStudent(id,studentData){
    const jsonData= JSON.stringify(studentData);
    const cmd = `curl -i -X PUT "${BASE_URL}/students/${id}" -H "Content-Type: application/json" -d "${jsonData.replace(/"/g, '\\"')}"`;
    runCommand(cmd);
}

/**
 * Recibe ID y datos parciales, imprime comando PATCH
 * @param {number} id - Id del estudiante
 * @param {Object} partialData - Object con los datos del estudiante
 */
export function patchStudent(id, partialData){
    const jsonData= JSON.stringify(partialData);
    const cmd= `curl -i -X PATCH "${BASE_URL}/students/${id}" -H "Content-Type: application/json" -d "${jsonData.replace(/"/g, '\\"')}"`;
    runCommand(cmd);
}

/**
 * Recibe ID del estudiante, imprime comando DELETE
 * @param {number} id - Id del estudiante
 */
export function deleteStudent(id){
    const cmd = `curl -i -X DELETE "${BASE_URL}/students/${id}"`;
    runCommand(cmd);
}


// ---- EJECUCIÓN DE LAS FUNCIONES ----

console.log("----INICIO----\n\nImpresión de comandos cURL para CRUD de estudiantes:\n");

console.log("--- Test de crear un nuevo estudiante ---")
createStudent(
    {
      id: 8,
      name: "Claudia Solera Solana",
      email: "claudiasolera@email.com",
      enrollmentDate: "2025-10-05",
      active: true,
      level: "beginner"
    }
);
console.log("\n");


console.log("--- Test de listar a todos los estudiantes ---");
readAllStudents();
console.log("\n");


console.log("--- Test de listar a un estudiante por su id ---")
readStudentById(3);
console.log("\n");


console.log("--- Test de actualizar todos los campos de un estudiante ---")
updateStudent(2,
    {
        "id": 2,
        "name": "María García López",
        "email": "maria.garcia@email.com",
        "enrollmentDate": "2024-10-10",
        "active": false,
        "level": "advanced"
    }
);
console.log("\n");


console.log("--- Test de actualizar un campo en concreto de un estudiante ---")
patchStudent(2, {level:"advanced"});
console.log("\n");


console.log("--- Test de eliminar un estudiante ---")
deleteStudent(5);
console.log("\n");


console.log("\nComandos cURL impresos.\n\n----FIN----");