# Peliculas

Aplicación web para la gestión de una biblioteca personal de películas.

## Características

+ Backend con Node.js y MySql.
+ Fronend con Angular2 (*POR HACER*)
+ Autenticación mediante token JWT

## Requisitos

+ Node.js y Npm
+ MySql

## Instalción

+ Instalar Node.js con Npm
+ Instalar una base de datos MySql (recomendado docker)
+ Instalar MySql Workbench para poder administrar la base de datos
+ Ejecutar npm install para descargar los paquetes
+ Añadir estas variables de entorno
> 1. PORT que es el puerto de escucha para las peticiones HTTP
> 2. DATABASE_URL que contiene la URL de conexión a la base de datos MySql
> 3. HASH_SECRET que es el la clave secreta que usa la aplicación para encriptar las contraseñas de los usuarios
+ Ejecutar node main.js
+ Ir a http://localhost:PORT en el navegador

## usuarios y roles

La aplicación tiene dos tipos de usuarios: administrador y usuarios normales. Cuando arranca crea un usuario de cada tipo:
+ Usuario: admin - Password: Admin_123 - Tipo: administrador
+ Usuario: user - Password: User_123 - Tipo: usuario normal

## Script de creación de la base de datos

    CREATE TABLE `users` (
        `userName` varchar(10) NOT NULL,
        `password` varchar(100) NOT NULL,
        `isAdmin` varchar(45) NOT NULL,
    PRIMARY KEY (`userName`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

