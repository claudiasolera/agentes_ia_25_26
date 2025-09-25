#!/bin/bash

#@author: Claudia Solera Solana
#@comment:
#@description: Crear un script utilizando el comando command -v verifique si tengo o no instalados los paquets git, node, npm, curl. Si alguno de dichos paquetes no está en el sistema,
#mostraremos mensaje de error.


echo "Verificando los requisitos previos"

if command -v node > /dev/null 2>&1 ;then
	NODE_VERSION=$(node --version)
	echo ";) Node instalado correctamente; versión: $NODE_VERSION"
else
	echo ":( No tienes instalado NodeJS"
	exit 1
fi


if command -v git > /dev/null 2>&1 ;then
        GIT_VERSION=$(git --version)
        echo ";) Git instalado correctamente; versión: $GIT_VERSION"
else
        echo ":( No tienes instalado git"
        exit 1
fi


if command -v npm > /dev/null 2>&1 ;then
        NPM_VERSION=$(npm --version)
        echo ";) NPM instalado correctamente; versión: $NPM_VERSION"
else
        echo ":( No tienes instalado NPM"
        exit 1
fi


if command -v curl > /dev/null 2>&1 ;then
        CURL_VERSION=$(curl --version)
        echo ";) Curl instalado correctamente; versión: $CURL_VERSION"
else
        echo ":( No tienes instalado curl"
        exit 1
fi


echo "Todos los paquetes instalados correctamente :D"
