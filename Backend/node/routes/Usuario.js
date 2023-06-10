const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario/Usuario");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUsuario = await Usuario.findOne({ username });

    if (existingUsuario) {
      return res.status(409).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({ username, password: hashedPassword });
    await newUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o usuário" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Usuarios = await Usuario.find();
    res.json(Usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Usuarios" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar a autenticação" });
  }
});

module.exports = router;
