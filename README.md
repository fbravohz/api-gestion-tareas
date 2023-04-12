# Documentación de API

## Introducción
Esta es la documentación de la API de tareas. La API permite realizar operaciones CRUD sobre las tareas.
Se debe enviar una API Key como `header` con el nombre `Task-Manager-Api-Key` para autenticarse correctamente como uno de los usuarios de la aplicación.

### Lista de API Keys disponibles
- `Oh6JpTYuEo5BaSVz`
- `NsC53apw6DN7UPVD`
- `GW3tgnU9FCeyuS/L`

### Crear archivo .env en el directorio raíz del proyecto para conectarse a la base de datos. Debe contener: 

    DB_USERNAME  = doadmin
	DB_PASSWORD  = AVNS_09rA6ACSEgJHOFjf-fV
	DB_HOST  = db-mysql-nyc1-97148-do-user-13282339-0.b.db.ondigitalocean.com
	DB_PORT  = 25060
	DB_DATABASE  = defaultdb

## Base URL
La URL base de la API es `http://localhost:3000`.

## Endpoints
A continuación se detallan los endpoints disponibles.

### Obtener todas las tareas
### `GET /task`
Obtiene todas las tareas existentes en la base de datos.
#### Parámetros
- Ninguno
#### Respuesta
-  `200 OK` en caso de éxito.
-  `404 Not Found` en caso de error.
##### Ejemplo de respuesta exitosa
    {
		"auth": {
			"id_user": 2,
			"username": "Juan Lopez"
		},
		"data": [
			{
			"id_task": 1,
			"title": "Crear una nueva ventana emergente",
			"description": "la ventana tiene que tener un color azul",
			"status": 1
			},
			{
			"id_task": 2,
			"title": "Añadir boton me gusta a los comentarios",
			"description": "el boton tiene que ajustarse a la medida de 200px x 100px",
			"status": 0
			}
		]
	}

### Obtener una tarea específica
### `GET /task/:id`
Obtiene una tarea específica por su ID.
#### Parámetros
- Ninguno
#### Respuesta
-  `200 OK` en caso de éxito.
-  `400 Bad Request` en caso de error.
-  `404 Not Found` en caso de no encontrar el ID.
##### Ejemplo de respuesta exitosa
	{
		"auth": {
			"id_user": 2,
			"username": "Juan Lopez"
		},
		"data": [
			{
				"id_task": 2,
				"title": "Añadir boton me gusta a los comentarios",
				"description": "el boton tiene que ajustarse a la medida de 200px x 100px",
				"status": 0,
				"comment": "Esperamos al PM para actualizacion",
				"responsible": "Vicente Suarez",
				"tags": "frontend,UI/UX,design"
			}
		]
	}

### Crear una nueva tarea
### `POST /task`
Crea una nueva tarea con las propiedades recibidas en el body (JSON).
#### Parámetros
-  `title` (obligatorio): título de la tarea.
-  `description`(obligatorio): descripción de la tarea.
-  `status` (obligatorio): estado actual de la tarea (`pending = 0` o `done = 1`).
- `comment`(opcional): comentarios específicos para la tarea.
- `responsible`(opcional): persona responsable de la tarea.
- `tags`(opcional): tags para la tarea.
##### Ejemplo de una solicitud exitosa
	{
		"title": "title",
		"description": "description",
		"status": 0,
		"comment": "comment",
		"responsible": "responsible",
		"tags": "tag1,tag2"
	}
#### Respuesta
-  `201 Created` en caso de éxito.
-  `400 Bad Request` en caso de error.
##### Ejemplo de respuesta exitosa
	{
		"auth": {
			"id_user": 2,
			"username": "Juan Lopez"
		},
		"data": {
			"created": "/task/3"
		}
	}

### Modificar una tarea existente
### `PUT /task/:id`
Modificar una tarea existente dado un ID con las propiedades obtenidas en el body (JSON).
#### Parámetros
-  `title` (opcional): título de la tarea.
-  `description`(opcional): descripción de la tarea.
-  `status` (opcional): estado actual de la tarea (`pending = 0` o `done = 1`).
- `comment`(opcional): comentarios específicos para la tarea.
- `responsible`(opcional): persona responsable de la tarea.
- `tags`(opcional): tags para la tarea.
##### Ejemplo de una solicitud exitosa
	{
		"title": "title2",
		"description": "description2",
		"status": 1,
		"comment": "comment2",
		"responsible": "responsible2",
		"tags": "tag3,tag4"
	}
#### Respuesta
-  `200 OK` en caso de éxito.
-  `400 Bad Request` en caso de error.
##### Ejemplo de respuesta exitosa
	{
		"auth": {
			"id_user": 2,
			"username": "Juan Lopez"
		},
		"data": {
			"issued": "/task/3",
			"affectedRows": 1
		}
	}

### Eliminar una tarea existente
### `DELETE /task/:id`
Eliminar una tarea existente dado un ID.
#### Parámetros
- Ninguno
#### Respuesta
-  `200 OK` en caso de éxito.
-  `404 Not Found` en caso de error.
##### Ejemplo de respuesta exitosa
	{
		"auth": {
			"id_user": 2,
			"username": "Juan Lopez"
		},
		"data": {
			"deleted": "/task/3",
			"affectedRows": 1
		}
	}

#### Prueba esta API utilizando:
[Insomnia.rest](https://insomnia.rest/)