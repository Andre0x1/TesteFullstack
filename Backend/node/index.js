const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const Produto = require("./routes/Produto");
const Usuario = require("./routes/Usuario");
const Lista = require("./routes/Lista");
const ListaProdutos = require("./routes/ListaProdutos");

app.use(express.json());
app.use(cors());

app.use("/produto/", Produto);
app.use("/usuario/", Usuario);
app.use("/lista/", Lista);
app.use("/listaProdutos/", ListaProdutos);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
