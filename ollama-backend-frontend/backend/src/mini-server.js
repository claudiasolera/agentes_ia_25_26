import { config } from 'dotenv';
import cors from 'cors';
import express from 'express';

//cargamos las variables de entorno desde el archivo .env()

config();

// inicializamos las aplicación de express
const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';
const SERVER_URL= process.env.SERVER_URL || 'http://localhost:3002';
const AI_API_URL = process.env.AI_API_URL || 'http://localhost:11434';
const AI_MODEL = process.env.AI_MODEL || 'llama3.2:1b';

// middleware
app.use(cors());
app.use(express.json());

// ruta de prueba
//1. info de estado

const getAppInfo = () => ({
    name: 'Mini Server backend ollama',
    verison: '1.0.0',
    status:'running',
    description:'Servidor backend para manejar solicitudes de IA',
    endpoints: {
        'GET /api': 'Información básica del servidor y del modelo de IA',
        'GET /api/modelos': 'Información del modelo de IA configurado en ollama',
        'POST /api/consulta': 'Enviar un prompt al modelo de IA y obtener una respuesta',
    },
    model : AI_MODEL,
    host: `${HOST}:${PORT}`,
    ollama: {
        url: AI_API_URL,
    },
});


// ENDPOINTS utilizados por el frontend

// Endpoint de información básica del servidor
app.get('/', (req,res)=>{
    res.json(getAppInfo());
});

// Endpoint /api
app.get('/api', (req,res)=>{
    res.json(getAppInfo());
});

// Endpoint para obtener información del modelo de IA configurado en ollama
app.get('/api/modelos', async (req,res)=>{
    try{
        const response = await fetch(`${AI_API_URL}/api/tags`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
            signal: AbortSignal.timeout(5000),
        });
        if(!response.ok){
            return res.status(response.status).json({error: `Error fetching ollama: ${response.statusText}`});
        }
        const data = await response.json();
        const modelos = data.models || [];
        res.json({
            total: modelos.lenght,
            modelos,
            origen: AI_API_URL,
        });
    }catch(error){
        res.status(502).json({ 
            error: 'Error al obtener modelos',
            message: error.message,
        });
    }
});


// Endpoint para enviar una consulta al modelo de IA
app.post('/api/consulta', async (req,res)=> {
    const { promt, model } = req.body || {};
    if(!prompt || typeof prompt !== 'string'){
        return res
        .status(400)
        .json({
            error: 'El campo prompt es obligatorio y debe ser una cadena de texto'
        });
    }
    const targetModel = model || AI_MODEL;
    try{
        // petición a ollama
        const respone = await fetch(`${AI_API_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                model: targetModel,
                prompt,
                stream: false,
            }),
            signal: AbortSignal.timeout(20000),
        });
    }catch(error){
        res.status(502).json({ 
            error: 'Error al obtener modelos',
            message: error.message,
        });  
        if(!response.ok){
            return res
            .status(response.status)
            .json({error: `Error fetching ollama: ${response.statusText}`});
        }
        const data = await response.json();
        const modelos = data.models || [];
        res.json({
            prompt,
            modelo: targetModel,
            response: data.response || "",
            latencyMs: data.latencyMs || undefined,
            origen: AI_API_URL,
        });
    }
});


// Endpoint: lanzamos el servidor HTTP de express con los endpoints definidos
app.listen(PORT, HOST, ()=>{
    console.log(
        `=========================================================================================
        🖥️ Mini Server backend ollama by Claudia
        Servidor backend mini-server escuchando en ${SERVER_URL} (entorno: ${process.env.NODE_ENV})
        Por favor accede a: ${SERVER_URL}/api para ver la información del servidor.
        Asegúrate de que el servicio de IA esté corriendo en: ${AI_API_URL}
        ==========================================================================================
        `
    );
});

export default app;