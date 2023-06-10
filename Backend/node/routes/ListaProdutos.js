const express = require("express");
const router = express.Router();
const ListaProdutos = require("../models/Lista_Produto/Lista_Produtos");

router.post("/", async (req, res) => {
  try {
    const { idLista, idProduto } = req.body;
    const newItem = new ListaProdutos({ idLista, idProduto });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar produto a Lista" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Listas = await ListaProdutos.find();
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter Listas" });
  }
});

router.get("/produtos", async (req, res) => {
  try {
    const { idLista } = req.query;
    const Listas = await ListaProdutos.find({ idLista });
    res.json(Listas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter produtos da lista" });
  }
});

module.exports = router;
