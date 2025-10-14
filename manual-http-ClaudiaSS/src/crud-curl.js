import dotenv from 'dotenv';
dotenv.config();

const PORT= process.env.PORT;
const API_BASE_URL = process.env.API_BASE_URL;
const BASE_URL = `${API_BASE_URL}:${PORT}`;

/**
 * Recibe objeto con datos del estudiante e imprime comando CREATE
 * @param
 */
export function createStudent(studentData){
    const jsonData = JSON.stringify(studentData);
    const create= `curl -i -X POST "${BASE_URL}/students" -H "Content-Type: application/json" -d '${jsonData}'`;
    console.log(create);
}

/**
 * Imprimer comando para leer todos los estudiantes (sin parámetros)
 */
export function readAllStudents(){
    const readStudents = `curl -i -X GET "${BASE_URL}/students"`;
    console.log(readStudents);
}

/**
 * Recibe el ID del estudiante, imprime comando para leerlo
 * @param {Object} id - Objeto con el id del estudiante
 */
export function readStudentById(id){
    const readStudentId = `curl -i -X GET "${BASE_URL}/students/${id}"`;
    console.log(readStudentId);
}

/**
 * Recibe ID y datos completos, imprime comando PUT
 * @param {Object} id - Objeto con el id del estudiante
 * @param {Object} studentData - Objecto con los datos del estudiante
 */
export function updateStudent(id,studentData){
    const jsonData= JSON.stringify(studentData);
    const put = `curl -i -X PUT "${BASE_URL}/students/${id}" -H "Content-Type: application/json" -d '${jsonData}'`;
    console.log(put);
}

/**
 * Recibe ID y datos parciales, imprime comando PATCH
 * @param {Object} id - Objeto con el id del estudiante
 * @param {Object} partialData - Object con los datos del estudiante
 */
export function patchStudent(id, partialData){
    const jsonData= JSON.stringify(partialData);
    const patch= `curl -i -X PATCH "${BASE_URL}/students/${id}" -H "Content-Type: application/json" -d '${jsonData}'`;
    console.log(patch);
}

/**
 * Recibe ID del estudiante, imprime comando DELETE
 * @param {Object} id - Objeto con el id del estudiante
 */
export function deleteStudent(id){
    const borrar = `curl -i -X DELETE "${BASE_URL}/students/${id}"`;
    console.log(borrar);
}


// ---- EJECUCIÓN DE LAS FUNCIONES ----

console.log("----INICIO----\n\nImpresión de comandos cURL para CRUD de estudiantes:\n");

createStudent(
    {
      "id": "8",
      "name": "Claudia Solera Solana",
      "email": "claudiasolera@email.com",
      "enrollmentDate": "2025-10-05",
      "active": true,
      "level": "beginner"
    }
);


readAllStudents();


readStudentById(7);


updateStudent(1,
    {
        "id": 1,
        "name": "María García López",
        "email": "maria.garcia@email.com",
        "enrollmentDate": "2024-10-10",
        "active": false,
        "level": "advanced"
    }
);


patchStudent(2, {level:"advanced"});


deleteStudent(5);


console.log("\nComandos cURL impresos.\n\n----FIN----");