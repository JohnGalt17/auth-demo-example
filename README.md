# Demo de Microservicios con Node.js 🚀

Este proyecto es una demostración educativa que muestra el flujo completo de una petición HTTP en Node.js, incluyendo autenticación con JWT, manejo de sesiones y cookies.

## 🎯 Objetivos

- Entender el flujo completo de una petición HTTP
- Comprender cómo funcionan los middleware en Express
- Aprender sobre autenticación con JWT
- Entender el manejo de sesiones y cookies
- Visualizar el ciclo de vida de una petición

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express
- JWT (JSON Web Tokens)
- Express Session
- Cookie Parser
- Winston (Logging)
- Morgan (HTTP Logging)

## 📋 Estructura del Proyecto

```
microservicios-demo/
├── src/
│   ├── middleware/     # Middleware personalizados
│   ├── routes/         # Rutas de la API
│   ├── public/         # Archivos estáticos
│   └── index.js        # Punto de entrada
├── .env                # Variables de entorno
├── .env.example        # Ejemplo de variables de entorno
└── package.json        # Dependencias y scripts
```

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
cd microservicios-demo
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

4. Iniciar el servidor:

```bash
npm start
```

## ⚙️ Configuración del Entorno

El archivo `.env` contiene las siguientes variables:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de autenticación
JWT_SECRET=clave_secreta_demo_para_la_clase
JWT_EXPIRES_IN=1h

# Configuración de sesiones
SESSION_SECRET=clave_secreta_demo_para_la_clase
SESSION_MAX_AGE=86400000 # 24 horas en milisegundos

# Configuración de cookies
COOKIE_SECURE=false # En producción debe ser true
COOKIE_HTTP_ONLY=true
```

## 🔍 Flujo de una Petición

1. 📦 El cliente envía una petición HTTP
2. 🍪 Cookie-parser procesa las cookies
3. 🔐 Express-session maneja la sesión
4. 📝 Morgan registra la petición HTTP
5. 📊 Logger personalizado registra detalles
6. 🛣️ Las rutas procesan la petición
7. 🔄 El ciclo se repite para la respuesta

## 📝 Endpoints Disponibles

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario (protegido)
- `POST /api/auth/logout` - Cierre de sesión

## 🎓 Conceptos Clave

### Middleware

- **Morgan**: Logging de peticiones HTTP
- **Cookie Parser**: Manejo de cookies
- **Express Session**: Gestión de sesiones
- **Logger Personalizado**: Registro detallado

### Autenticación

- **JWT**: Tokens de autenticación
- **Sesiones**: Estado del usuario
- **Cookies**: Almacenamiento en el cliente

### Seguridad

- Encriptación de contraseñas
- Tokens JWT
- Cookies seguras
- Sesiones HTTP-only

## 🐛 Debugging

El proyecto incluye logging detallado en cada paso:

- Peticiones HTTP
- Procesamiento de cookies
- Manejo de sesiones
- Autenticación
- Respuestas

## 📚 Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Express Session](https://github.com/expressjs/session)
- [Cookie Parser](https://github.com/expressjs/cookie-parser)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
