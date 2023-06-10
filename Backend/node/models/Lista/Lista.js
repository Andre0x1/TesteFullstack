const mongoose = require("mongoose");

const ListaSchema = new mongoose.Schema(
  {
    idUsuario: { type: String, required: true },
    nome: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Lista", ListaSchema);
