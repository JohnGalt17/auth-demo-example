const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Simulación de base de datos
const users = [];

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  console.log("🔍 Verificando token JWT...");
  const token = req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    console.log("❌ No se encontró token");
    return res
      .status(403)
      .json({ message: "Se requiere token para autenticación" });
  }

  try {
    console.log("🔑 Token encontrado, verificando...");
    const decoded = jwt.verify(token, "clave_secreta_demo");
    req.user = decoded;
    console.log("✅ Token válido");
    next();
  } catch (err) {
    console.log("❌ Token inválido:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Registro de usuario
router.post("/register", async (req, res) => {
  console.log("\n📝 Registro de nuevo usuario");
  console.log("Datos recibidos:", req.body);

  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.find((user) => user.username === username)) {
    console.log("❌ Usuario ya existe");
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔒 Contraseña encriptada");

  // Crear usuario
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  console.log("✅ Usuario creado:", newUser);

  res.status(201).json({ message: "Usuario registrado exitosamente" });
});

// Login
router.post("/login", async (req, res) => {
  console.log("\n🔐 Proceso de login");
  console.log("Datos recibidos:", req.body);

  const { username, password } = req.body;

  // Buscar usuario
  const user = users.find((user) => user.username === username);
  if (!user) {
    console.log("❌ Usuario no encontrado");
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log("❌ Contraseña incorrecta");
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generar JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "clave_secreta_demo",
    { expiresIn: "1h" }
  );
  console.log("🔑 Token JWT generado");

  // Configurar cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hora
  });
  console.log("🍪 Cookie configurada");

  // Configurar sesión
  req.session.user = {
    id: user.id,
    username: user.username,
  };
  console.log("💾 Sesión configurada");

  res.json({
    message: "Login exitoso",
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  });
});

// Ruta protegida
router.get("/profile", verifyToken, (req, res) => {
  console.log("\n👤 Accediendo a perfil protegido");
  console.log("Usuario autenticado:", req.user);

  res.json({
    message: "Perfil accedido exitosamente",
    user: req.user,
    session: req.session.user,
  });
});

// Logout
router.post("/logout", (req, res) => {
  console.log("\n🚪 Proceso de logout");

  // Limpiar cookie
  res.clearCookie("token");
  console.log("🍪 Cookie eliminada");

  // Destruir sesión
  req.session.destroy();
  console.log("💾 Sesión destruida");

  res.json({ message: "Logout exitoso" });
});

module.exports = router;
