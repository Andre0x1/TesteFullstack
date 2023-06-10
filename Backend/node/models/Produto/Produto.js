const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String },
    link: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Produto", ProdutoSchema);
