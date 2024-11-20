import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gato brincando com um novelo de lã",
    imagem: "https://placekitten.com/400/200",
  },
  {
    id: 3,
    descricao: "Paisagem com um gato",
    imagem: "https://placekitten.com/600/300",
  },
  {
    id: 4,
    descricao: "Gato dormindo em uma caixa",
    imagem: "https://placekitten.com/800/400",
  },
  {
    id: 5,
    descricao: "Gato olhando pela janela",
    imagem: "https://placekitten.com/1000/500",
  },
  {
    id: 6,
    descricao: "Gato comendo ração",
    imagem: "https://placekitten.com/1200/600",
  },
];

// Criando o servidor
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

//Criando uma rota, solicitando uma requisição e resposta
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// Criando função para chamar os ids
function buscarPost(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPost(req.params.id);
  res.status(200).json(posts[index]);
});
