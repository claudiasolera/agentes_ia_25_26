#!/bin/bash

valido=true;

archivos=(
    "package.json"
    "src/db/db.json"
    ".gitignore"
    ".env.example"
    "README.md"
    "checklist.md"
    "peticiones-crud.http"
    "src/crud-curl.js"
)

carpetas=(
    "src"
    "images"
    "scripts"
)

# Comprobar archivos

for archivo in "${archivos[@]}"
do
    if [ -f "$archivo" ]
    then
        echo ":D El archivo $archivo existe"
    else
        echo ":c El archivo $archivo no existe"
        valido=false;
    fi
done

# Comprobar carpetas

for carpeta in "${carpetas[@]}"
do
    if [ -d "$carpeta" ]
    then
        echo ":D La carpeta $carpeta existe"
    else
        echo ":c La carpeta $carpeta no existe"
        valido=false
    fi
done

# Verificar en package.json

if grep -q '"type": *"module"' package.json
then
    echo ":D type: module está presente"
else
    echo ":c type: module no se encuentra"
    valido=false
fi

if grep -q '"dotenv"' package.json
then
    echo ":D dotenv está presente"
else
    echo ":c dotenv no se escuentra"
    valido=false
fi

if grep -q '"json-server"' package.json
then
    echo ":D json-server está presente"
else
    echo ":c json-server no se escuentra"
    valido=false
fi

if grep -q '"server:up"' package.json
then
    echo ":D server:up está presente"
else
    echo ":c server:up no se escuentra"
    valido=false
fi

if grep -q '"crud:curl"' package.json
then
    echo ":D crud:curl está presente"
else
    echo ":c crud:curl no se escuentra"
    valido=false
fi


# Comprobar capturas de Thunder Client

if [ -d "images" ]
then
    contador=$(find images -type f -iname "*TC*" | wc -l)
    if [ "$contador" -ge 6 ]
    then
        echo ":D Se han encontrado $contado capturas de Thunder Client en images/ . Son suficientes"
    else
        echo ":c Se han encontrado $contador captuas de Thunder Client en images/ . No son suficientes"
        valido=false
    fi
fi


# Mensaje final

if [ "$valido" = true ]
then
    echo ":D Pasó la verificación con éxito"
else
    echo ":c No pasó la verificación"
fi