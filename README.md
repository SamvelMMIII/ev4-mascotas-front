# Mascotas Front

Aplicacion front-end desarrollada con React y Vite para consumir la API de MascotasApp.

## Funcionalidades implementadas

- Listar mascotas desde `GET /api/mascotas/`.
- Ver el detalle de una mascota desde `GET /api/mascotas/{id}/`.
- Registrar una nueva mascota con imagen usando `POST /api/mascotas/` y `FormData`.
- Actualizar el estado de una mascota usando `PATCH /api/mascotas/{id}/`.
- Eliminar una mascota usando `DELETE /api/mascotas/{id}/`.
- Agregar comentarios asociados a una mascota usando `POST /api/comentarios/`.
- Eliminar comentarios usando `DELETE /api/comentarios/{id}/`.
- Mostrar mensajes de error diferenciando respuestas `400` y `404`.

## Conexion con la API

La conexion se realiza mediante una instancia de Axios configurada en:

```js
baseURL: "https://mascotas.pythonanywhere.com/api/"
```

Esta instancia se reutiliza en las vistas y componentes para realizar las peticiones al backend.

## Manejo de validaciones y errores

El proyecto maneja errores en las peticiones HTTP revisando `error.response.status` y mostrando mensajes al usuario segun el tipo de respuesta:

- `201`: respuesta esperada al registrar correctamente una mascota o comentario.
- `400`: error de validacion cuando los datos enviados no cumplen con lo requerido por la API.
- `404`: recurso no encontrado, por ejemplo cuando una mascota o comentario no existe.
- Otros errores: se muestra un mensaje generico para indicar que ocurrio un problema inesperado.

En el formulario de mascotas tambien se valida que los campos obligatorios esten completos antes de enviar la informacion a la API.

## Uso de IA

Durante el desarrollo se utilizo Codex como herramienta de apoyo para revisar el codigo del front-end, verificar que las funcionalidades solicitadas estuvieran implementadas y analizar el manejo de errores.

Codex ayudo especificamente en:

- Revisar la conexion con la API mediante Axios.
- Verificar que existieran peticiones `GET`, `POST`, `PATCH` y `DELETE`.
- Revisar las validaciones del formulario antes de enviar datos.
- Comprobar que los mensajes de error diferencien respuestas como `201`, `400` y `404`.
- Ejecutar y revisar el resultado de `npm run build`.
- Ejecutar ESLint para detectar advertencias y errores relevantes antes de la entrega.

## Comandos del proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Generar build de produccion:

```bash
npm run build
```

Ejecutar linter:

```bash
npm run lint
```
