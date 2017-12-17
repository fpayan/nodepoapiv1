# Nodepop API v.1.0.0
___

## Introducción

Esta **API** es una práctica para la **Keepcoding's Master Bootcamp VI**. El objetivo es crear una **API** para consumir, en la que se establece dos entidades una **USER** y otra **ANUNCIO**, así un usuario puede hacer lo siguiente:

#### Qué hace esta **API** ?:

- Registrar nuevos usuarios
- Login de usuario **( Requerido para ver anuncios )**
- Listar anuncios
- Filtrar anuncios
- Ver los **TAGs** que existen
 
## Setup
 
### 1. Descargar el código e instalar el entorno.

Lo primero que tenemos que hacer antes de nada es tener instalado [Node](https://nodejs.org) y [Mongo DB](https://www.mongodb.com/)

_Doy por hecho que este entorno esta instalado en su ordenador y ejecutandose._

Clonamos este repo desde **Github** para poder instala los módulos necesarios para ejecutar la **API**. Así que nos vamos a la terminal y escribimos los siguiente comandos:
 
 ```Bash
 $ git clone https://github.com/fpayan/nodepoapiv1
 $ cd nodepopapi
 $ npm install
 ```
### 2. Antes de ejecutar nada...

Después de tener el repo descargado en su maquina hay que llenar la base de datos con algunos usuariso y anuncios para que las peticiones devuelvan algunos datos, así que ejecutamos los siguiente comando en la ternina:

```Bash
 $ npm run createUser
 $ npm run createAnnounce
```
Ahora deberemos tener datos dentro de una db llamada **nodepop** y con dos colecciones llamadas **users** y **announces** respectivamentes.

Dentro de nuestras pruebas trabajaremos que un *user* **fake1@fake.org** como email y como password **12345**

Para iniciar la **api** de *nodepop* debemos hacerlo con el siguiente comando:

```Bash
$ npm run startDev
```

Esta *api* estará escuchando peticiones en la siguiente url: *http://localhost:3000*
 
## Que retorna en cada petición ?

Esta *api* retorna **JSON** object por cada petición que se haga correctamente al servidor.

~~~json
{
	success: true || false,
	message: "message text",
	token: token => "adsfderqrwef435436ydgfgt76576576...",
	announce: announce => [{announce}]
}
~~~

Las posibles peticiones que haremos son:

### User (Login and Register)

#### a)	User Register (POST)

**Method**: `apiv1/user/register`

Register a new user

**Request URL**: `http://localhost:3000/apiv1/user/register`

**Request Body *(x-www-form-urlencoded)*:**

| Key				| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| password      	| String	        	| (required) user's password |
| name 		 	| String	        	| user's name                |
| age				| Number 	        	| user's age                 |
| role 		 	| String	        	| user's rol (Default Client)|

**Optional Params**

| Parameter		| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
|lng				| String				| Parámetro para cambiar los mensajes de error traducidos. "es" para  Spanish, "en" para Inglés. Por defecto coje el parámetro lang que envia el navegador en la petición.| 

**Example:**

Body Values:

| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| miemail@email.com	| 
| password      	| 12345          	| 
| name 		 	| jonh 	        	| 
| age 		    	| 24   	        	| 

El campo "password" es encrypted por razones de seguridad.

**Response:**

~~~json
{
    "success": true,
    "newUser": {
        "__v": 0,
        "name": "jonh",
        "age": 24,
        "email": "miemail@email.com",
        "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
        "_id": "5a35b8fe7d357622a8cff03b",
        "update": "2017-12-17T00:23:26.000Z",
        "created": "2017-12-17T00:23:26.000Z",
        "role": [
            "Client"
        ],
        "announces": []
    }
}
~~~

![register user](./public/images/register.png)


#### b)	User Authentication (POST)


**Method**: `/apiv1/user/login`

Authenticate user with email and password and get token to use in the requests

**Request URL**: `http://localhost:3000/apiv1/user/login`

**Request Body *(x-www-form-urlencoded)*:**

| Key				| Type					| Description                |
|:------------ 	|:---------------:	| :----------------------    |
| email	      	| String			 	| (required) user's email    |
| password      	| String	        	| (required) user's password |

**Example:**


| Parameter		| Value				| 
|:------------ 	|:---------------:	| 
| email	      	| miemail@email.com	| 
| password      	| 12345          	| 


Ahora podemos tener el **token** en la respuesta del servidor, para poder seguir haciendo peticiones con el **token**.

**Response:**

~~~json
{
    "success": true,
    "message": "User validated",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzViOGZlN2QzNTc2MjJhOGNmZjAzYiIsImlhdCI6MTUxMzQ3MTYxNSwiZXhwIjoxNTEzNTU4MDE1fQ.XOkMOZ5J4s2jHx5phps0Lyt3rqVKq9meCliglt4KRuw",
    "cross": false
}
~~~

![Login user](./public/images/login.png)


### 2. Announce
---

#### a) Announces List (GET)


**Method**: `apiv1/announce?token=YOUR_TOKEN`

Lista todos los anuncios (pueden filtrarse co los parámetros correctos).  **TOKEN** es necesario para ver anuncios.

**Request Params**

| Parameter		| Type					| Description                          |
|:------------ 	|:---------------:	| :----------------------              |
| token	      	| String			 	| (required) token.                    |

**Request URL**: `http://localhost:3000/apiv1/announce/?token=YOUR_TOKEN` 

Return list of announces

![announces get](./public/images/announces-get.png)

#### b) Announces List (POST)

**Method**: `apiv1/announce`

| Parameter		| Type					| Description                          |
|:------------ 	|:---------------:	| :----------------------              |
| token	      	| String			 	| (required) token.                    |

**Request URL**: `http://localhost:3000/apiv1/announce/` 

~~~json
{
  "success": true,
    "announces": [
        {
            "_id": "5a35c228b606d725563bcaa5",
            "nameArticle": "Global Communications Associate",
            "textArticle": "Non vel ea ad et illo vel eum saepe.\nItaque rerum ut sunt accusantium ut quia.\nQuod aut illo culpa quis assumenda est aut ut libero.\nOfficia ut aperiam quo quaerat exercitationem vel et.",
            "price": 77432,
            "salesAnnounce": false,
            "urlImage": "http://lorempixel.com/[object object]/480/0",
            "idUserOwn": "5a35b8fe7d357622a8cff03b",
            "__v": 0,
            "update": "2017-12-17T01:02:32.055Z",
            "created": "2017-12-17T01:02:32.055Z",
            "tags": [
                "mobile"
            ]
        },
        {
            "_id": "5a35c228b606d725563bcaa6",
            "nameArticle": "Principal Functionality Administrator",
            "textArticle": "Reiciendis beatae et architecto illo quae blanditiis nulla.\nVel ipsam quod id voluptatibus atque consequatur distinctio.\nEt sint neque ducimus reiciendis quos fugit voluptate quibusdam.\nVoluptatum eligendi id quia quam occaecati quia dicta omnis.",
            "price": 96174,
            "salesAnnounce": true,
            "urlImage": "http://lorempixel.com/[object object]/480/1",
            "idUserOwn": "5a35b8fe7d357622a8cff03b",
            "__v": 0,
            "update": "2017-12-17T01:02:32.060Z",
            "created": "2017-12-17T01:02:32.060Z",
            "tags": [
                "mobile"
            ]
        },
        .....
}
~~~

---
![](./public/images/announces-post.png)
