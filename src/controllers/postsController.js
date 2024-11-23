import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postModel.js";
import fs from "fs/promises";
import path from "path";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
  try {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
  } catch (erro) {
    console.error("Erro ao listar posts:", erro.message);
    res.status(500).json({ message: "Erro ao listar posts" });
  }
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(201).json({
      message: "Post criado com sucesso",
      id: postCriado.insertedId,
    });
  } catch (erro) {
    console.error("Erro ao criar o post:", erro.message);
    res.status(500).json({ message: "Erro ao criar o post" });
  }
}

export async function uploadImagem(req, res) {
  try {
    const novoPost = req.body;
    const postCriado = await criarPost(novoPost);

    const caminhoImagem = path.resolve(
      "uploads",
      `${postCriado.insertedId}.png`
    );
    await fs.rename(req.file.path, caminhoImagem);

    res.status(201).json({
      message: "Upload realizado com sucesso",
      id: postCriado.insertedId,
    });
  } catch (erro) {
    console.error("Erro ao fazer upload da imagem:", erro.message);
    res.status(500).json({ message: "Erro ao fazer upload da imagem" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const caminhoImagem = path.resolve("uploads", `${id}.png`);
  const urlImagem = `http://localhost:3000/uploads/${id}.png`;

  try {
    // Validar se a imagem existe
    let imgBuffer;
    try {
      imgBuffer = await fs.readFile(caminhoImagem);
    } catch (erro) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    // Gerar descrição usando Gemini
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postAtualizado = await atualizarPost(id, post);

    if (postAtualizado.modifiedCount === 0) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json({
      message: "Post atualizado com sucesso",
      post,
    });
  } catch (erro) {
    console.error("Erro ao atualizar o post:", erro.message);
    res.status(500).json({ message: "Erro ao atualizar o post" });
  }
}
