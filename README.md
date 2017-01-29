###Arrancar proyecto

* Instalar las dependencias del proyecto (**npm install**)
* Ejecutar **npm run installBD** (para instalar la base de datos, requiere de un mongoDB arrancado)
* Ejecutar **nodemon**

-- 

### API

- Registro (nombre, email, contraseña)
	- URL: /apiv1/usuarios/register
	- Método: POST
	- Parametros: 
		- email (String)
		- nombre (String)
		- password (String)- Autenticación (email, contraseña)
	- URL: /apiv1/usuarios/login
	- Método: POST
	- Parametros:
		- email (String)
		- password (String)
- Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el dato buscado)
	- URL: /apiv1/anuncios
	- Método: GET
	- Requiere token de autenticacion
	- Parametros querystring:
		- token (String)(required)
		- tag (String)
		- venta (true|false)
		- precioMax (int)
		- precioMin (int)
		- nombre (String)
		- page (int)- Lista de tags existentes
	- URL: /apiv1/anuncios/tags
	- Método: GET
	- Requiere token de autenticacion
	- Parametros querystring:
		- token (String)(required)