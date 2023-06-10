const express = require("express");
const router = express.Router();
const Lista = require("../models/Lista/Lista");

router.post("/", async (req, res) => {
  try {
    const { idUsuario, nome } = req.body;
    const newItem = new Lista({ idUsuario, nome });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar Lista" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Listas = await Lista.find();
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Listas" });
  }
});

router.get("/lists/", async (req, res) => {
  try {
    const { idUsuario } = req.query;
    const Listas = await Lista.find({ idUsuario });
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Listas do usuario" });
  }
});

module.exports = router;
