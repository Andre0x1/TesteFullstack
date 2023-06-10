const express = require("express");
const router = express.Router();
const Produto = require("../models/Produto/Produto");

// Rota para adicionar um item à lista de desejos
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, link } = req.body;
    const newItem = new Produto({ nome, descricao, link });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar Produtos" });
  }
});

// Rota para listar os itens da lista de desejos
router.get("/", async (req, res) => {
  try {
    const Produtos = await Produto.find();
    res.json(Produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Produtos" });
  }
});

module.exports = router;
