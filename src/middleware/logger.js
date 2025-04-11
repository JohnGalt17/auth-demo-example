const winston = require("winston");

// Configuración del logger con colores
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// Middleware de logging detallado
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log de la petición entrante
  logger.info("\n📥 Petición entrante:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    cookies: req.cookies,
    session: req.session,
    body: req.body,
  });

  // Interceptar la respuesta
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;

    // Log de la respuesta
    logger.info("\n📤 Respuesta enviada:", {
      status: res.statusCode,
      duration: `${duration}ms`,
      headers: res.getHeaders(),
      body: body,
    });

    return originalSend.call(this, body);
  };

  next();
};

module.exports = {
  logger: requestLogger,
};
