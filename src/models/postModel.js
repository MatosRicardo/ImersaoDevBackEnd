import "dotenv/config";
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

let conexao;
(async () => {
  conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
})();

export async function getTodosPosts() {
  const db = conexao.db("Imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  const db = conexao.db("Imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("Imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.updateOne({ _id: new ObjectId(id) }, { $set: novoPost });
}
