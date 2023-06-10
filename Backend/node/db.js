const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Andre0x1:0wr59m1O9MGBbS1B@cluster0.w7qz5ba.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conexão com o banco de dados estabelecida"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));
