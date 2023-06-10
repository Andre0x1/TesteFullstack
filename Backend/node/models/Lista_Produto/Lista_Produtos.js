const mongoose = require("mongoose");

const ListaProdutosSchema = new mongoose.Schema(
  {
    idLista: { type: String, required: true },
    idProduto: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("ListaProdutos", ListaProdutosSchema);
