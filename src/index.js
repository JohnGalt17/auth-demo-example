// Verificar variables de entorno antes de iniciar
require("../scripts/check-env.js");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const { logger } = require("./middleware/logger");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsear JSON
app.use(express.json());
console.log("🔧 Middleware express.json() configurado");

// Middleware para parsear cookies
app.use(cookieParser());
console.log("🍪 Middleware cookie-parser configurado");

// Configuración de sesiones (usando memoria en lugar de MongoDB)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
      httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
      secure: process.env.COOKIE_SECURE === "true",
    },
  })
);
console.log("🔐 Middleware de sesiones configurado");

// Middleware de logging de peticiones HTTP
app.use(morgan("dev"));
console.log("📝 Middleware morgan configurado");

// Middleware personalizado para logging
app.use(logger);
console.log("📊 Middleware de logging personalizado configurado");

// Rutas
app.use("/api/auth", authRoutes);
console.log("🛣️ Rutas de autenticación configuradas");

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error("❌ Error en la aplicación:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});
console.log("⚠️ Middleware de manejo de errores configurado");

app.listen(PORT, () => {
  console.log("\n🚀 Servidor iniciado en http://localhost:" + PORT);
  console.log("\n📋 Flujo de una petición:");
  console.log("1. 📦 El cliente envía una petición HTTP");
  console.log("2. 🍪 Cookie-parser procesa las cookies");
  console.log("3. 🔐 Express-session maneja la sesión");
  console.log("4. 📝 Morgan registra la petición HTTP");
  console.log("5. 📊 Logger personalizado registra detalles");
  console.log("6. 🛣️ Las rutas procesan la petición");
  console.log("7. 🔄 El ciclo se repite para la respuesta");
  console.log("\n👀 Abre http://localhost:" + PORT + " en tu navegador");
});
