import express from "express";

// Criando o servidor
const app = express();
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

//Criando uma rota, solicitando uma requisição e resposta
app.get("/api", (req, res) => {
  res.status(200).send("Boas vindas à imersão!");
});
