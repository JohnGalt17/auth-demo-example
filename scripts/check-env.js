const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Colores para la consola
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

// Variables requeridas
const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "SESSION_SECRET",
  "SESSION_MAX_AGE",
  "COOKIE_SECURE",
  "COOKIE_HTTP_ONLY",
];

function checkEnvFile() {
  const envPath = path.join(__dirname, "..", ".env");
  const envExamplePath = path.join(__dirname, "..", ".env.example");

  // Verificar si existe el archivo .env
  if (!fs.existsSync(envPath)) {
    console.log(
      `${colors.yellow}⚠️  No se encontró el archivo .env${colors.reset}`
    );
    console.log(
      `${colors.blue}ℹ️  Creando archivo .env desde .env.example...${colors.reset}`
    );

    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log(
        `${colors.green}✅ Archivo .env creado exitosamente${colors.reset}`
      );
    } else {
      console.log(
        `${colors.red}❌ No se encontró el archivo .env.example${colors.reset}`
      );
      process.exit(1);
    }
  }

  // Cargar variables de entorno
  require("dotenv").config();

  // Verificar variables requeridas
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error("❌ Error: Faltan las siguientes variables de entorno:");
    missingVars.forEach((envVar) => {
      console.error(`   - ${envVar}`);
    });
    console.error("\nPor favor, crea un archivo .env con estas variables.");
    process.exit(1);
  }

  // Verificar tipos de datos
  const errors = [];

  if (isNaN(parseInt(process.env.PORT))) {
    errors.push("PORT debe ser un número");
  }

  if (isNaN(parseInt(process.env.SESSION_MAX_AGE))) {
    errors.push("SESSION_MAX_AGE debe ser un número");
  }

  if (
    process.env.COOKIE_SECURE !== "true" &&
    process.env.COOKIE_SECURE !== "false"
  ) {
    errors.push('COOKIE_SECURE debe ser "true" o "false"');
  }

  if (
    process.env.COOKIE_HTTP_ONLY !== "true" &&
    process.env.COOKIE_HTTP_ONLY !== "false"
  ) {
    errors.push('COOKIE_HTTP_ONLY debe ser "true" o "false"');
  }

  if (errors.length > 0) {
    console.log(
      `${colors.red}❌ Errores en las variables de entorno:${colors.reset}`
    );
    errors.forEach((error) => {
      console.log(`  - ${colors.yellow}${error}${colors.reset}`);
    });
    process.exit(1);
  }

  console.log(
    `${colors.green}✅ Todas las variables de entorno están configuradas correctamente${colors.reset}`
  );
}

// Ejecutar verificación
checkEnvFile();
