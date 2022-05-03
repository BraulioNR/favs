# Favs

_Versión inicial del sistema BE Favs que tiene como objetivo proporcionar una mejor manera de organizar sus cosas favoritas: música, ropa, cursos, etc., todo en un solo lugar._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

* Nodejs - Idealmente 16.15.0
* Yarn - Idealmente 1.22.18
* npm - Idealmente 8.5.5
* MongoDB 

### Creacion de base de datos local

_Cree una base de datos en MongoDB, puede ser "dbfavs"._

_Y ejecute el servicio de Mongo, en caso no lo tenga activado, con el comando en una consola_
```
mongod
```
### Creacion de archivos .env

_Debe crear los archivos .env, .env.development y env.test_

_ Añada las variables de entorno que estan en .env.example_
```
PORT=
SECRET_KEY
MONGO_URI
```

-Agrege  sus valores dependiento del ambiente_

```
PORT=8888
SECRET_KEY=ejemplo
MONGO_URI=Uridetubasededatoscreada
```
### Instalando paquetes

_Debe abrir el proyecto e instalar los paquetes con  el comando_

```
yarn install
```

## Ejecutando las pruebas ⚙️

_Antes de ejecutar los comandos no olvide que su base de datos debe estar corrindo_
* _Para ejecutar las pruebas de integracion y funcionales debe ejecutar el comando_

```
yarn test
```
* _Para ejecutar las pruebas y mantenerlas corriendo debe ejecutar el comando_

```
yarn test:watch
```
* _Para ejecutar las pruebas y generar el coverage debe ejecutar el comando_

```
yarn test:coverage
```

## Ejecucion 📦

* _Para crear un usuario, la URL debe ser:http://localhost:8000/auth/local/signup_
_, la peticion tipo POST y el cuerpo de la solcitud debe ser similiar:_
```
{
"password":"Hola1234567.",
"email":"test1@test.com"
}
```
_La contraseña debe tener mas de 8 caracteres, tener minimo una letraminuscula, una letra mayuscula, un numero y un caracter especial_


* _Para el inicio de sesion, la URL debe ser: http://localhost:8000/auth/local/login_
_,la peticion tipo POST y el cuerpo de la solcitud debe ser similiar:_
```
{
"password":"Hola1234567.",
"email":"test1@test.com"
}
```

* _Para la creacion de una lista de favs, la URL debe ser:  http://localhost:8000/api/favs_
_,la peticion tipo POST, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario y el cuerpo de la solcitud debe ser similiar:_
```
{
    "name":"List name"
}
```

* _Para obtener las listas de favs, la URL debe ser:  http://localhost:8000/api/favs_
_,la peticion tipo GET, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

* _Para obtener una lista en especifico de favs, la URL debe ser:  http://localhost:8000/api/favs/:id_
_,la peticion tipo GET, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

* _Para eliminar una lista en especifico de favs, la URL debe ser:  http://localhost:8000/api/favs/:id_
_,la peticion tipo DELETE, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

* _Para actualizar el titulo una lista en especifico de favs, la URL debe ser:  http://localhost:8000/api/favs/:id__
_,la peticion tipo PUT, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_
```
{
    "name":"New name"
}
```
* _Para la creacion de un fav, la URL debe ser:   http://localhost:8000/api/itemfav_
_,la peticion tipo POST, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario y el cuerpo de la solcitud debe ser similiar:_
```
{
    "title":"Fav title",
    "description":"description",
    "link":"https://makeitreal.com",
    "listId":"6269878d3a207cb5a5ef98c7"
}
```
* _Para obtener todos favs del usuario, la URL debe ser:   http://localhost:8000/api/itemfav/_
_,la peticion tipo GET, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

* _Para obtener un fav en especifico, la URL debe ser:   http://localhost:8000/api/itemfav/:id_
_,la peticion tipo GET, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

* _Para actualizar un fav en especifico, la URL debe ser:   http://localhost:8000/api/itemfav/:id_
_,la peticion tipo PUT, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_
```
{
    "title":"new title",
    "description":"new description",
    "link":"new https://makeitreal.com",
}
```
* _Para eliminar un fav en especifico, la URL debe ser:   http://localhost:8000/api/itemfav/:id_
_,la peticion tipo DELETE, se debe pasar el Authorization en Headers, con el bearer token obtenido de la creacion o la autenticacion del usuario_

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Braulio B. Nole Ruiz** - [BraulioNR](https://github.com/BraulioNR)


