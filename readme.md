# instrucciones para configurar

- configure la conexión a la base de datos desde el archivo "base de datos" de la carpeta "config" => 'mysql://user:pass@example.com:port/dbname'.
- run "npm install" para instalar todas las dependencias de desarrollo.
- run el "archivo sql" en su servidor de base de datos para crear la base de datos y las tablas requeridas.
- run "npm start" para iniciar el servidor.

# los endpoints

# Sign up un nuevo usuario

```
http://localhost:port/users/signup
```

## post request con body json

### devuelve "status code 201" para el éxito y "status code 500" para el error.

```
{
"username": "example", // (STRING)
"fullname": "example", // (STRING)
"email": "example@gmail.com", // (STRING)
"phone": "example", // (STRING)
"address": "example", // (STRING)
"password" :"example" // (STRING)
}

```

# sign in un usuario para acceder a los recursos

```
http://localhost:port/users/signin
```

## POST REQUEST con un objeto json a través del body

### devuelve "status code 200" plus el token para el éxito y "status code 500" para el error.

```
{
    "email": "example@gmail.com", or "username" // (STRING)
    "password" :"example" // (STRING)
}

```

# listar todos los productos disponibles.

```
http://localhost:port/products
```

## GET REQUEST el usuario debe enviar "el token" a través del "headers" usando esta fórmula para obtener este recurso

```
Authorization : Bearer USER_TOKEN
```

### devuelve "status code 200" plus array of objects de productos para el éxito y "status code 500" para el error.

# generar un nuevo pedido al restaurante con un listado de platos que desea

```
http://localhost:port/products
```
