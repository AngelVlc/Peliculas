# Peliculas

Aplicación web para la gestión de una biblioteca personal de películas.

## Características

+ Backend con Node.js y MySql.
+ Frontend con Angular2
+ Autenticación mediante token JWT

## Requisitos

+ Node.js y Npm
+ MySql

## Instalación

+ Instalar Node.js con Npm
+ Instalar una base de datos MySql
+ Lanzar el script de creación de la base de datos (por ejemplo con MySql Workbench)
+ Ejecutar npm install para descargar los paquetes tanto en la carpeta raiz como en la carpeta client
+ DUDA: ¿hay que instalar typescrpt global?
+ Añadir estas variables de entorno
    * PORT que es el puerto de escucha para las peticiones HTTP
    * DATABASE_URL que contiene la URL de conexión a la base de datos MySql
    * HASH_SECRET que es el la clave secreta que usa la aplicación para encriptar las contraseñas de los usuarios
+ Ejecutar node main.js
+ Ir a http://localhost:PORT en el navegador

NOTA: los archivos typescript ya están transcompilados pero si cambian hay que ejecutar el comando tsc en la carpeta client. Con tsc -w se compilarían solos.

## Paquetes npm
+ express y body-parses -> servidor web
+ jsonwebtoken -> autenticación con JWT
+ bcrypt -> para encriptar las contraseñas de los usaurios en la base de datos
+ mysql
+ morgan -> muestra en la consola las peticiones http
+ heapdump -> para hacer volcados de la memoria [DESACTOVADO]

## usuarios y roles

La aplicación tiene dos tipos de usuarios: administrador y usuarios normales. Cuando arranca crea un usuario de cada tipo:
+ Usuario: 'admin' - Password: 'Admin_123' - Tipo: 'administrador'
+ Usuario: 'user' - Password: 'User_123' - Tipo: 'usuario normal'

## Script de creación de la base de datos

    CREATE TABLE `users` (
        `userId` int NOT NULL AUTO_INCREMENT,
        `userName` varchar(10) NOT NULL,
        `password` varchar(100) NOT NULL,
        `isAdmin` varchar(45) NOT NULL,
        PRIMARY KEY (`userId`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

